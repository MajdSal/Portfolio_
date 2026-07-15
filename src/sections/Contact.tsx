import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import ContactButton from '../components/ContactButton';
import { useLang } from '../i18n';

const Contact = () => {
  const { t } = useLang();

  const links = [
    { label: t.contact.email, icon: Mail, href: 'mailto:majdosama614@gmail.com' },
    { label: t.contact.github, icon: Github, href: 'https://github.com/MajdSal' },
    {
      label: t.contact.linkedin,
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mjad-sal-727998374/',
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden bg-[#0C0C0C] pt-28 pb-12"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(182,0,168,0.5), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(0.75rem,1vw,0.95rem)] uppercase tracking-[0.4em] text-glass/50"
        >
          {t.contact.kicker}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hero-heading mx-auto mt-4 max-w-4xl font-extrabold tracking-[-0.02em] text-[clamp(2.5rem,9vw,7rem)] leading-[0.9]"
        >
          {t.contact.heading}
        </motion.h2>

        <p className="mx-auto mt-6 max-w-xl text-[clamp(1rem,1.4vw,1.3rem)] font-light text-glass/70">
          {t.contact.subtitle}
        </p>

        <div className="mt-10 flex justify-center">
          <ContactButton
            href="mailto:majdosama614@gmail.com"
            label={t.hero.contact}
          />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
              className="group inline-flex items-center gap-2 text-glass/70 transition-colors duration-300 hover:text-white"
            >
              <Icon className="h-5 w-5" strokeWidth={1.6} />
              <span className="text-[0.95rem] font-light tracking-wide">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-20 flex max-w-[1600px] flex-col items-center justify-between gap-3 border-t border-white/5 px-5 pt-6 text-glass/40 sm:flex-row sm:px-8 lg:px-12">
        <p className="text-sm font-light">
          © {new Date().getFullYear()} {t.hero.line2}. {t.contact.rights}
        </p>
        <p className="inline-flex items-center gap-1.5 text-sm font-light">
          <MapPin className="h-4 w-4" strokeWidth={1.6} />
          {t.contact.availability}
        </p>
      </div>
    </section>
  );
};

export default Contact;
