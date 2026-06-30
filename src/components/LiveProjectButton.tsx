import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

/**
 * LiveProjectButton — ghost / outline counterpart to ContactButton, tuned to
 * the corporate-blue glass token (#D7E2EA).
 */
const LiveProjectButton = ({
  label = 'View Live Project',
  href = '#',
  className = '',
}: LiveProjectButtonProps) => {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 sm:px-7 sm:py-3 text-[clamp(0.85rem,1vw,1.1rem)] font-light tracking-wide transition-colors duration-300 ${className}`}
      style={{
        borderColor: 'rgba(215,226,234,0.45)',
        color: '#D7E2EA',
      }}
    >
      <span>{label}</span>
      <ExternalLink
        className="h-[1em] w-[1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.8}
      />
    </motion.a>
  );
};

export default LiveProjectButton;
