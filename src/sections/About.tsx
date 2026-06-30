import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Moon, Box, Hexagon, Sparkle } from 'lucide-react';

const COPY =
  "With a Bachelor's degree in Software Engineering (87% GPA) and extensive dual-domain experience across engineering development and humanitarian operations with bodies like Save the Children, I manage scalable automation layers and robust digital architectures. Let's engineer something impact-driven.";

interface WordProps {
  children: ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word = ({ children, range, progress }: WordProps) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className="relative mr-[0.28em] mt-[0.18em] inline-block">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};

const About = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.85', 'start 0.18'],
  });

  const words = COPY.split(' ');

  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden bg-[#0C0C0C] py-28 sm:py-40"
    >
      {/* Floating decorative glyphs pinned to the container corners */}
      <Moon
        className="absolute left-6 top-16 h-8 w-8 text-soft-pink/40 sm:left-12 sm:h-12 sm:w-12 animate-float"
        strokeWidth={1}
      />
      <Box
        className="absolute right-8 top-24 h-10 w-10 text-corp-blue/35 sm:right-16 sm:h-14 sm:w-14 animate-float"
        strokeWidth={1}
        style={{ animationDelay: '1.5s' }}
      />
      <Hexagon
        className="absolute bottom-20 left-10 h-9 w-9 text-corp-blue-soft/30 sm:left-24 sm:h-12 sm:w-12 animate-float"
        strokeWidth={1}
        style={{ animationDelay: '0.8s' }}
      />
      <Sparkle
        className="absolute bottom-28 right-10 h-7 w-7 text-soft-pink/40 sm:right-28 sm:h-10 sm:w-10 animate-float"
        strokeWidth={1}
        style={{ animationDelay: '2.2s' }}
      />

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center font-semibold tracking-[-0.02em] text-glass text-[clamp(2.5rem,7vw,6rem)] sm:mb-20"
        >
          About me
        </motion.h2>

        <div ref={container} className="relative">
          <p className="flex flex-wrap justify-center text-center font-light leading-[1.35] text-glass text-[clamp(1.4rem,3.6vw,2.9rem)] text-[30px]">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} range={[start, end]} progress={scrollYProgress}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
