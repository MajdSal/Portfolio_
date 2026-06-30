import { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

export interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

interface Dot {
  ax: number; // anchor x
  ay: number; // anchor y
  sx: number; // smoothed x
  sy: number; // smoothed y
}

interface MouseState {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
}

interface CanvasSize {
  w: number;
  h: number;
}

/**
 * DotField — a GPU-friendly canvas mesh of dots that bulge away from the
 * cursor and trail a soft radial glow. Pointer-events are disabled so the
 * field never steals clicks from the UI sitting on top of it (z-0).
 */
const DotField = memo(
  ({
    dotRadius = 1.5,
    dotSpacing = 14,
    cursorRadius = 500,
    cursorForce = 0.1,
    bulgeOnly = true,
    bulgeStrength = 67,
    glowRadius = 160,
    sparkle = false,
    waveAmplitude = 0,
    gradientFrom = 'rgba(168, 85, 247, 0.35)',
    gradientTo = 'rgba(180, 151, 207, 0.25)',
    glowColor = '#120F17',
  }: DotFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const glowRef = useRef<SVGCircleElement | null>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef<MouseState>({
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      speed: 0,
    });
    const rafRef = useRef<number | null>(null);
    const sizeRef = useRef<CanvasSize>({ w: 0, h: 0 });
    const glowOpacity = useRef(0);
    const engagement = useRef(0);

    // Keep the latest props readable from inside the animation loop without
    // re-subscribing the effect on every render.
    const propsRef = useRef<Required<Omit<DotFieldProps, 'glowColor'>>>(
      {} as Required<Omit<DotFieldProps, 'glowColor'>>,
    );
    propsRef.current = {
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      glowRadius,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const glowEl = glowRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      function buildDots(w: number, h: number) {
        const p = propsRef.current;
        const step = p.dotRadius + p.dotSpacing;
        const cols = Math.floor(w / step);
        const rows = Math.floor(h / step);
        const padX = (w % step) / 2;
        const padY = (h % step) / 2;
        const dots: Dot[] = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const ax = padX + c * step + step / 2;
            const ay = padY + r * step + step / 2;
            dots.push({ ax, ay, sx: ax, sy: ay });
          }
        }
        dotsRef.current = dots;
      }

      function doResize() {
        if (!canvas || !ctx) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        sizeRef.current = { w, h };
        buildDots(w, h);
      }

      function tick() {
        if (!ctx) return;
        const dots = dotsRef.current;
        const m = mouseRef.current;
        const { w, h } = sizeRef.current;
        const p = propsRef.current;

        // Decay cursor speed every frame so the field relaxes when idle.
        m.speed *= 0.92;
        const targetSpeed = Math.min(m.speed / 5, 1);
        engagement.current += (targetSpeed - engagement.current) * 0.06;
        glowOpacity.current += (engagement.current - glowOpacity.current) * 0.08;

        if (glowEl) {
          glowEl.setAttribute('cx', String(m.x));
          glowEl.setAttribute('cy', String(m.y));
          glowEl.style.opacity = String(glowOpacity.current);
        }

        ctx.clearRect(0, 0, w, h);

        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, p.gradientFrom);
        grad.addColorStop(1, p.gradientTo);
        ctx.fillStyle = grad;

        ctx.beginPath();
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          const dx = m.x - d.ax;
          const dy = m.y - d.ay;
          const distSq = dx * dx + dy * dy;

          if (
            distSq < p.cursorRadius * p.cursorRadius &&
            engagement.current > 0.01
          ) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / p.cursorRadius;
            const push = t * t * p.bulgeStrength * engagement.current;
            const angle = Math.atan2(dy, dx);
            // bulgeOnly pushes dots away from the cursor; otherwise they are
            // attracted toward it by the same vector.
            const dir = p.bulgeOnly ? -1 : 1;
            d.sx += (d.ax + dir * Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay + dir * Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            // Optional ambient wave when the cursor is far away.
            const waveY =
              p.waveAmplitude > 0
                ? Math.sin((d.ax + performance.now() * 0.001) * 0.5) *
                  p.waveAmplitude
                : 0;
            d.sx += (d.ax - d.sx) * 0.1;
            d.sy += (d.ay + waveY - d.sy) * 0.1;
          }

          ctx.moveTo(d.sx + p.dotRadius, d.sy);
          ctx.arc(d.sx, d.sy, p.dotRadius, 0, TWO_PI);
        }
        ctx.fill();

        rafRef.current = requestAnimationFrame(tick);
      }

      // Track the cursor relative to the canvas' live bounding box so the
      // effect stays aligned even while the page scrolls.
      function handleMouseMove(e: MouseEvent) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const nx = e.clientX - rect.left;
        const ny = e.clientY - rect.top;
        const m = mouseRef.current;
        const dx = nx - m.x;
        const dy = ny - m.y;
        // Cap per-event speed so a fast flick can't blow out the bulge.
        m.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 100);
        m.prevX = m.x;
        m.prevY = m.y;
        m.x = nx;
        m.y = ny;
      }

      doResize();

      // ResizeObserver keeps the mesh crisp when the parent changes size for
      // reasons other than a window resize (font load, layout shifts, etc.).
      const ro = new ResizeObserver(doResize);
      if (canvas.parentElement) ro.observe(canvas.parentElement);
      window.addEventListener('resize', doResize);
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      rafRef.current = requestAnimationFrame(tick);

      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        window.removeEventListener('resize', doResize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
        <canvas ref={canvasRef} className="absolute inset-0" />
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="dotfield-glow">
              <stop offset="0%" stopColor={glowColor} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle
            ref={glowRef}
            cx="-9999"
            cy="-9999"
            r={glowRadius}
            fill="url(#dotfield-glow)"
            style={{ opacity: 0, willChange: 'opacity' }}
          />
        </svg>
      </div>
    );
  },
);

DotField.displayName = 'DotField';

export default DotField;
