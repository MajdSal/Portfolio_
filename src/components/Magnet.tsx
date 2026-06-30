import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagnetProps {
  children: ReactNode;
  /** Active region around the element, in px, where the magnet engages. */
  padding?: number;
  /** Higher = subtler pull (the mouse delta is divided by this). */
  strength?: number;
  className?: string;
  /** Disable the effect (e.g. for touch / reduced-motion). */
  disabled?: boolean;
}

/**
 * Magnet — translates its children toward the cursor while the pointer is
 * within `padding` of the element's bounds, then springs back to rest.
 */
const Magnet = ({
  children,
  padding = 100,
  strength = 2,
  className = '',
  disabled = false,
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const withinX = Math.abs(distX) < width / 2 + padding;
      const withinY = Math.abs(distY) < height / 2 + padding;

      if (withinX && withinY) {
        setPos({ x: distX / strength, y: distY / strength });
      } else {
        setPos({ x: 0, y: 0 });
      }
    },
    [padding, strength],
  );

  useEffect(() => {
    if (disabled) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, disabled]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: disabled ? 0 : pos.x, y: disabled ? 0 : pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.6 }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;
