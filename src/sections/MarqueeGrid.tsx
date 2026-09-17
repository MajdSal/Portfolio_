import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';
import {
  Cpu,
  FileText,
  LayoutDashboard,
  Workflow,
  Layers,
  MonitorSmartphone,
  Database,
  Camera,
  Bot,
  ServerCog,
  Sparkles,
  PanelsTopLeft,
} from 'lucide-react';
import { useLang } from '../i18n';

/** Keep a value within the [min, max) range, wrapping around the edges. */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

type Tile = {
  label: string;
  sub: string;
  icon: ReactNode;
  from: string;
  to: string;
  image: string;
};

// Visual identity (icon + gradient + cover art) lives here; text comes from the
// i18n dict and is merged by index at render time. Each cover illustrates its
// own label, so the two arrays must stay in the same order as the dict.
const ENGINEERING_STYLE = [
  { icon: <ServerCog />, from: '#1a0f2e', to: '#3a1052', image: '/tiles/django-backends.svg' },
  { icon: <Bot />, from: '#0A1626', to: '#173a5e', image: '/tiles/ai-modules.svg' },
  { icon: <Workflow />, from: '#241033', to: '#5a1e6e', image: '/tiles/n8n-automation.svg' },
  { icon: <Database />, from: '#0A1626', to: '#1f4d6b', image: '/tiles/relational-data.svg' },
  { icon: <FileText />, from: '#2a0f24', to: '#6e1e5a', image: '/tiles/technical-writing.svg' },
  { icon: <Cpu />, from: '#101a2e', to: '#2b4d7a', image: '/tiles/algorithms-ds.svg' },
];

const SCREENS_STYLE = [
  { icon: <LayoutDashboard />, from: '#161024', to: '#3a1c5e', image: '/tiles/masar-dashboard.svg' },
  { icon: <Layers />, from: '#0A1626', to: '#1f4d6b', image: '/tiles/frameline-hero.svg' },
  { icon: <Camera />, from: '#2a0f24', to: '#7a1e63', image: '/tiles/photography-edit.svg' },
  { icon: <MonitorSmartphone />, from: '#101a2e', to: '#34557f', image: '/tiles/responsive-web.svg' },
  { icon: <Sparkles />, from: '#1a0f2e', to: '#4a1c6e', image: '/tiles/glsl-shaders.svg' },
  { icon: <PanelsTopLeft />, from: '#0A1626', to: '#255a7a', image: '/tiles/workflow-platform.svg' },
];

const TileCard = ({ tile, variant }: { tile: Tile; variant: 'block' | 'screen' }) => (
  <div className="group relative h-[180px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-[220px] sm:w-[360px]">
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${tile.from}, ${tile.to})` }}
    />
    {/* cover art illustrating the label; masked clear of the icon and caption */}
    <div
      aria-hidden
      className="tile-cover pointer-events-none absolute inset-y-0 end-0 w-[72%]"
    >
      <img
        src={tile.image}
        alt=""
        decoding="async"
        className="h-full w-full object-cover object-center"
      />
    </div>
    {/* faux browser chrome for the "app screens" row */}
    {variant === 'screen' && (
      <div className="absolute left-0 right-0 top-0 flex h-7 items-center gap-1.5 border-b border-white/10 bg-black/25 px-3">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
    )}
    <div
      className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
      style={{ background: 'radial-gradient(closest-side, rgba(233,168,201,0.7), transparent)' }}
    />
    <div className="relative flex h-full flex-col justify-end p-5">
      <div className="mb-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-glass [&>svg]:h-5 [&>svg]:w-5">
        {tile.icon}
      </div>
      <p className="text-lg font-semibold text-white">{tile.label}</p>
      <p className="text-sm font-light text-glass/60">{tile.sub}</p>
    </div>
  </div>
);

interface RowProps {
  tiles: Tile[];
  baseVelocity: number;
  variant: 'block' | 'screen';
}

/**
 * ParallaxRow — auto-scrolls continuously and accelerates / reverses with the
 * page scroll velocity. Tiles are duplicated so the loop is seamless.
 */
const ParallaxRow = ({ tiles, baseVelocity, variant }: RowProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  // Two copies → wrap across exactly half the track width.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const doubled = [...tiles, ...tiles];

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div className="flex gap-5 pr-5" style={{ x }}>
        {doubled.map((tile, i) => (
          <TileCard key={`${tile.label}-${i}`} tile={tile} variant={variant} />
        ))}
      </motion.div>
    </div>
  );
};

const MarqueeGrid = () => {
  const { t } = useLang();

  const engineering: Tile[] = t.marquee.engineering.map((txt, i) => ({
    ...txt,
    ...ENGINEERING_STYLE[i],
  }));
  const screens: Tile[] = t.marquee.screens.map((txt, i) => ({
    ...txt,
    ...SCREENS_STYLE[i],
  }));

  return (
    <section className="relative z-10 overflow-hidden bg-[#0C0C0C] py-16 sm:py-24">
      <div className="mx-auto mb-10 max-w-[1600px] px-5 sm:mb-14 sm:px-8 lg:px-12">
        <p className="text-start text-[clamp(0.75rem,1vw,0.95rem)] uppercase tracking-[0.4em] text-glass/50">
          {t.marquee.heading}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Row 1 — moves right */}
        <ParallaxRow tiles={engineering} baseVelocity={-2.2} variant="block" />
        {/* Row 2 — moves left */}
        <ParallaxRow tiles={screens} baseVelocity={2.2} variant="screen" />
      </div>
    </section>
  );
};

export default MarqueeGrid;
