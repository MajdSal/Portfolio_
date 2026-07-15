import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLang } from '../i18n';
import LanguageToggle from './LanguageToggle';

// Anchor targets stay constant; only the visible label is translated.
const NAV_KEYS = ['about', 'services', 'projects', 'contact'] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-[#0C0C0C]/55 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12 lg:py-6">
        <a
          href="#hero"
          className="font-semibold tracking-[0.18em] text-glass text-[clamp(1rem,1.4vw,1.35rem)] uppercase"
        >
          Majdallah<span className="text-soft-pink-deep">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex lg:gap-12">
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className="group relative uppercase tracking-[0.2em] text-glass/90 text-[0.9rem] lg:text-[1.4rem] transition-colors duration-300 hover:text-white"
              >
                {t.nav[key]}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-soft-pink transition-all duration-300 group-hover:w-full ltr:left-0 rtl:right-0" />
              </a>
            </li>
          ))}
          <li>
            <LanguageToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="text-glass"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-2 border-t border-white/5 bg-[#0C0C0C]/95 px-6 pb-6 pt-2 md:hidden"
        >
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="block py-3 uppercase tracking-[0.25em] text-glass/90 hover:text-white"
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
};

export default Navbar;
