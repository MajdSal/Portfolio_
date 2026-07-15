import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n';

const NUMERALS = ['01', '02', '03', '04'];

const Services = () => {
  const { t } = useLang();
  const services = t.services.items.map((item, i) => ({
    no: NUMERALS[i],
    ...item,
  }));

  return (
    <section
      id="services"
      className="relative z-20 -mt-8 rounded-t-[2.5rem] bg-white text-[#0C0C0C] sm:rounded-t-[3.5rem]"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="ink-heading font-semibold tracking-[-0.02em] text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
            {t.services.heading}
          </h2>
          <p className="max-w-sm text-[clamp(0.9rem,1.1vw,1.05rem)] font-light text-black/55">
            {t.services.subtitle}
          </p>
        </div>

        <ul className="border-t border-black/10">
          {services.map((s, i) => (
            <motion.li
              key={s.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border-b border-black/10"
            >
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 py-8 transition-colors duration-300 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-8 sm:py-12">
                <span className="font-light tabular-nums text-black/30 text-[clamp(2rem,5vw,4.5rem)] leading-none transition-colors duration-300 group-hover:text-soft-pink-deep">
                  {s.no}
                </span>

                <div className="col-span-1">
                  <h3 className="font-medium tracking-[-0.01em] text-[clamp(1.4rem,3vw,2.6rem)] leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[clamp(0.95rem,1.2vw,1.2rem)] font-light leading-relaxed text-black/55">
                    {s.desc}
                  </p>
                </div>

                <ArrowUpRight
                  className="col-start-2 row-start-1 h-7 w-7 justify-self-end text-black/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-soft-pink-deep sm:col-start-3"
                  strokeWidth={1.6}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
