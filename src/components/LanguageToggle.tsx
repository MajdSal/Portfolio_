import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLang } from '../i18n';

interface LanguageToggleProps {
  className?: string;
}

/**
 * LanguageToggle — ghost pill that flips the whole page between English (LTR)
 * and Arabic (RTL). Label always shows the language you'll switch TO.
 */
const LanguageToggle = ({ className = '' }: LanguageToggleProps) => {
  const { toggle, t } = useLang();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={t.toggleAria}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`group inline-flex items-center gap-2 rounded-full border border-glass/30 px-4 py-2 text-glass transition-colors duration-300 hover:border-glass/70 hover:bg-white/5 ${className}`}
    >
      <Languages className="h-4 w-4" strokeWidth={1.8} />
      <span className="text-[0.85rem] font-medium tracking-[0.15em]">
        {t.toggle}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
