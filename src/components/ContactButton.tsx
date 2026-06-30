import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

/**
 * ContactButton — pill CTA with the brand gradient, an inset inner glow and a
 * crisp white offset outline. Label scales fluidly across breakpoints.
 */
const ContactButton = ({
  label = 'Contact Me',
  href = '#contact',
  className = '',
}: ContactButtonProps) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 sm:px-8 sm:py-4 font-medium text-white ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          'inset 0 1px 1px rgba(255,255,255,0.45), inset 0 -8px 18px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(255,255,255,0.9), 0 18px 40px -12px rgba(182,0,168,0.55)',
      }}
    >
      <span className="text-[clamp(0.95rem,1.1vw,1.25rem)] tracking-wide">
        {label}
      </span>
      <ArrowUpRight
        className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.2}
      />
    </motion.a>
  );
};

export default ContactButton;
