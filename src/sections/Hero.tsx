import { motion } from 'framer-motion';
import { useState } from 'react';
import DotField from '../components/DotField';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';

// Verified avatar path (real photo lives in /public with this name).
const AVATAR = '/profile image 2025-07-10 at 17.41.05_0c45143f.png';
const AVATAR_FALLBACK = '/avatar-fallback.svg';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const [imgSrc, setImgSrc] = useState(AVATAR);

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen w-full overflow-hidden"
    >
      {/* Interactive dot-mesh backdrop (z-0, pointer-events-none) */}
      <DotField
        dotRadius={1.6}
        dotSpacing={16}
        cursorRadius={520}
        bulgeStrength={70}
        glowRadius={220}
        gradientFrom="rgba(233, 168, 201, 0.32)"
        gradientTo="rgba(127, 168, 201, 0.20)"
        glowColor="#1a0f24"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col px-5 sm:px-8 lg:px-12">
        {/* Title + central portrait */}
        <div className="flex flex-1 flex-col items-center justify-center pt-28 pb-6 text-center">
          <motion.h1
            custom={0}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="hero-heading select-none font-extrabold leading-[0.82] tracking-[-0.02em] text-[13vw] lg:text-[16vw]"
          >
            Hi, I&rsquo;m
          </motion.h1>

          {/* Absolute-central portrait nestled between the heading lines */}
          <Magnet
            padding={150}
            strength={3}
            className="relative z-20 -my-[3vw] sm:-my-[2.5vw]"
          >
            <motion.div
              custom={1}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="group relative"
            >
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-3xl"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(182,0,168,0.55), rgba(118,33,176,0.25), transparent)',
                }}
              />
              <img
                src={imgSrc}
                onError={() => {
                  if (imgSrc !== AVATAR_FALLBACK) setImgSrc(AVATAR_FALLBACK);
                }}
                alt="Portrait of Majdallah"
                width={420}
                height={520}
                loading="eager"
                decoding="async"
                className="h-[clamp(170px,26vh,360px)] w-auto rounded-[2rem] border border-white/10 object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </motion.div>
          </Magnet>

          <motion.h1
            custom={2}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="hero-heading select-none font-extrabold leading-[0.82] tracking-[-0.02em] text-[13vw] lg:text-[16vw]"
          >
            MajdAllah
          </motion.h1>
        </div>

        {/* Bottom content: subtitle (left) + ContactButton (right) */}
        <motion.div
          custom={3}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between lg:pb-14"
        >
          <p className="max-w-md text-balance text-left text-[clamp(0.95rem,1.4vw,1.25rem)] font-light leading-relaxed text-glass/80">
            A Software Engineer &amp; Multimedia Specialist creating
            production-grade automation systems and unforgettable visual
            platforms.
          </p>

          <div className="shrink-0">
            <ContactButton />
          </div>
        </motion.div>
      </div>

      {/* subtle scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.4em] text-glass/40"
      >
        scroll
      </motion.div>
    </section>
  );
};

export default Hero;
