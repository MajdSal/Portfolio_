import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Bot, Clapperboard, PackageSearch } from 'lucide-react';
import LiveProjectButton from '../components/LiveProjectButton';

interface Project {
  index: string;
  title: string;
  desc: string;
  tags: string[];
  icon: typeof Bot;
  from: string;
  to: string;
}

const PROJECTS: Project[] = [
  {
    index: '01',
    title: 'CrewAI Automation Suite',
    desc: 'Multi-agent orchestration layer driving real-time web-scraping pipelines and interactive data analysis modules.',
    tags: ['CrewAI', 'Python', 'Realtime', 'Data Analysis'],
    icon: Bot,
    from: '#2a0f24',
    to: '#6e1e5a',
  },
  {
    index: '02',
    title: 'NextLevel Studio Systems',
    desc: 'Clean production-grade application engineered for scalable media workflow distribution.',
    tags: ['React', 'TypeScript', 'Media', 'Workflow'],
    icon: Clapperboard,
    from: '#0A1626',
    to: '#1f4d6b',
  },
  {
    index: '03',
    title: 'Humanitarian Logistical Hubs',
    desc: 'Specialized data analytics interface helping streamline multi-site parcel monitoring systems.',
    tags: ['Analytics', 'Logistics', 'Dashboards', 'Field Ops'],
    icon: PackageSearch,
    from: '#241033',
    to: '#5a1e6e',
  },
];

interface CardProps {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
}

const Card = ({ project, i, total, progress, range }: CardProps) => {
  // Each card scales down slightly as later cards stack over it.
  const targetScale = 1 - (total - 1 - i) * 0.04;
  const scale = useTransform(progress, range, [1, targetScale]);
  const Icon = project.icon;

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(8vh + ${i * 26}px)`,
          background: `linear-gradient(135deg, ${project.from}, ${project.to})`,
        }}
        className="relative flex h-[64vh] max-h-[560px] w-full max-w-[1100px] flex-col overflow-hidden rounded-[2rem] border border-white/10 p-7 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:p-12"
      >
        {/* glow accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(233,168,201,0.6), transparent)',
          }}
        />

        <div className="flex items-center justify-between">
          <span className="font-light tabular-nums text-white/40 text-[clamp(2.5rem,6vw,5rem)] leading-none">
            {project.index}
          </span>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-glass">
            <Icon className="h-7 w-7" strokeWidth={1.6} />
          </span>
        </div>

        <div className="mt-auto">
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

          <div className="mt-8">
            <LiveProjectButton href="#contact" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" className="relative z-10 bg-[#0C0C0C]">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 lg:px-12">
        <h2 className="font-semibold tracking-[-0.02em] text-glass text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
          Projects
        </h2>
        <p className="mt-4 max-w-md text-[clamp(0.95rem,1.2vw,1.15rem)] font-light text-glass/60">
          A stacking deck of shipped systems — scroll to flip through.
        </p>
      </div>

      <div ref={container} className="relative">
        {PROJECTS.map((project, i) => (
          <Card
            key={project.index}
            project={project}
            i={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
            range={[i / PROJECTS.length, 1]}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
