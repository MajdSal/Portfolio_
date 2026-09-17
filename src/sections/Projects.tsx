import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Bot, Clapperboard, LayoutDashboard } from 'lucide-react';
import LiveProjectButton from '../components/LiveProjectButton';
import { useLang } from '../i18n';

interface Project {
  index: string;
  title: string;
  desc: string;
  tags: string[];
  icon: typeof Bot;
  from: string;
  to: string;
  image: string;
  /** Public URL. Omitted while a project has nothing live to point at. */
  href?: string;
}

// Visual identity + outbound link per project; title/desc/tags come from the
// i18n dict. Drop an `href` in here once a project has a public URL — the
// "View Live" button only renders for entries that have one.
const PROJECT_STYLE = [
  {
    index: '01',
    icon: Bot,
    from: '#2a0f24',
    to: '#6e1e5a',
    image: '/projects/workflow.svg',
    href: 'https://workflownets.com',
  },
  {
    index: '02',
    icon: LayoutDashboard,
    from: '#0A1626',
    to: '#1f4d6b',
    image: '/projects/masar.svg',
    href: 'https://masar-ivory-beta.vercel.app/',
  },
  {
    index: '03',
    icon: Clapperboard,
    from: '#241033',
    to: '#5a1e6e',
    image: '/projects/frameline.svg',
    href: 'https://new-edits.vercel.app/',
  },
];

interface CardProps {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  liveLabel: string;
}

const Card = ({ project, i, total, progress, range, liveLabel }: CardProps) => {
  // Each card scales down slightly as later cards stack over it.
  const targetScale = 1 - (total - 1 - i) * 0.04;
  const scale = useTransform(progress, range, [1, targetScale]);
  const Icon = project.icon;

  return (
    // Taller than the viewport so each card dwells — uncovered, with a live
    // "View Live" button — for ~66vh of scrolling before the next card stacks
    // over it. At h-screen that window was only ~26vh. Aligned to the top with
    // an 18vh pad rather than centred, so the extra height hangs below the fold
    // instead of pushing the card down out of view.
    // Every wrapper must be the SAME height: a sticky card unsticks at
    // containerBottom - itsWrapperHeight, so a shorter last wrapper makes the
    // earlier cards slide away before the last one arrives and tears a gap in
    // the stack. The trailing slack is reclaimed on the container instead.
    // pointer-events-none: the wrapper's empty pad above the card is invisible
    // but would still swallow clicks aimed at the previous card's button, which
    // sits underneath it. Hit-testing is re-enabled on the card itself.
    <div className="pointer-events-none sticky top-0 flex h-[140vh] items-start justify-center px-4 pt-[18vh] sm:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(8vh + ${i * 26}px)`,
          background: `linear-gradient(135deg, ${project.from}, ${project.to})`,
        }}
        className="pointer-events-auto relative flex h-[64vh] max-h-[560px] w-full max-w-[1100px] flex-col overflow-hidden rounded-[2rem] border border-white/10 p-7 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:p-12"
      >
        {/* cover art — bleeds from the trailing edge, masked into the gradient */}
        <div
          aria-hidden
          className="project-cover pointer-events-none absolute inset-y-0 end-0 start-0 opacity-30 md:start-auto md:w-[52%] md:opacity-100"
        >
          {/* Not lazy: the covers are 3-4KB of inline art, so deferring them
              only risks a blank panel on the frame a card slides in. */}
          <img
            src={project.image}
            alt=""
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* glow accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(233,168,201,0.6), transparent)',
          }}
        />

        <div className="relative flex items-center justify-between">
          <span className="font-light tabular-nums text-white/40 text-[clamp(2.5rem,6vw,5rem)] leading-none">
            {project.index}
          </span>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-glass">
            <Icon className="h-7 w-7" strokeWidth={1.6} />
          </span>
        </div>

        {/* Copy leads; from md up the live link sits centred under the cover. */}
        <div className="relative mt-auto flex flex-col gap-7 md:flex-row md:items-end md:gap-8">
          <div className="md:w-1/2">
            <h3 className="font-semibold tracking-[-0.02em] text-white text-[clamp(1.8rem,4.5vw,3.6rem)] leading-[1.02]">
              {project.title}
            </h3>
            <p className="mt-4 max-w-2xl text-[clamp(1rem,1.4vw,1.35rem)] font-light leading-relaxed text-glass/80">
              {project.desc}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.8rem] font-light tracking-wide text-glass/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.href && (
            <div className="flex shrink-0 md:w-1/2 md:justify-center">
              <LiveProjectButton href={project.href} label={liveLabel} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Sliced so an extra dict entry without matching style art can't render a
  // card with no icon.
  const projects: Project[] = t.projects.items
    .slice(0, PROJECT_STYLE.length)
    .map((item, i) => ({ ...item, ...PROJECT_STYLE[i] }));

  return (
    <section id="projects" className="relative z-10 bg-[#0C0C0C]">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 lg:px-12">
        <h2 className="font-semibold tracking-[-0.02em] text-glass text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
          {t.projects.heading}
        </h2>
        <p className="mt-4 max-w-md text-[clamp(0.95rem,1.2vw,1.15rem)] font-light text-glass/60">
          {t.projects.subtitle}
        </p>
      </div>

      {/* The last wrapper's slack below the final card is empty — the card has
          already scrolled past it — so pull the next section up over it rather
          than leaving a dead gap. Margin doesn't change the container's box, so
          the sticky stacking above is untouched. */}
      <div ref={container} className="relative -mb-[40vh]">
        {projects.map((project, i) => (
          <Card
            key={project.index}
            project={project}
            i={i}
            total={projects.length}
            progress={scrollYProgress}
            range={[i / projects.length, 1]}
            liveLabel={t.projects.viewLive}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
