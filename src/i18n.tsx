import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

export type Lang = 'en' | 'ar';

export interface Dict {
  /** Label shown on the toggle = the language you switch TO. */
  toggle: string;
  toggleAria: string;
  nav: { about: string; services: string; projects: string; contact: string };
  hero: {
    line1: string;
    line2: string;
    subtitle: string;
    scroll: string;
    contact: string;
  };
  marquee: {
    heading: string;
    engineering: { label: string; sub: string }[];
    screens: { label: string; sub: string }[];
  };
  about: { heading: string; copy: string };
  services: {
    heading: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  projects: {
    heading: string;
    subtitle: string;
    viewLive: string;
    items: { title: string; desc: string; tags: string[] }[];
  };
  contact: {
    kicker: string;
    heading: string;
    subtitle: string;
    email: string;
    github: string;
    linkedin: string;
    rights: string;
    availability: string;
  };
}

const en: Dict = {
  toggle: 'العربية',
  toggleAria: 'Switch language to Arabic',
  nav: { about: 'About', services: 'Services', projects: 'Projects', contact: 'Contact' },
  hero: {
    line1: "Hi, I'm",
    line2: 'MajdAllah',
    subtitle:
      'A Software Engineer & Multimedia Specialist creating production-grade automation systems and unforgettable visual platforms.',
    scroll: 'scroll',
    contact: 'Contact Me',
  },
  marquee: {
    heading: 'Selected work in motion',
    engineering: [
      { label: 'Modular APIs', sub: 'Decoupled services' },
      { label: 'Multi-Agent Mesh', sub: 'CrewAI orchestration' },
      { label: 'CI / CD Pipelines', sub: 'Continuous delivery' },
      { label: 'Data Pipelines', sub: 'ETL & ingestion' },
      { label: 'System Design', sub: 'Scalable layers' },
      { label: 'Edge Compute', sub: 'Low-latency runtime' },
    ],
    screens: [
      { label: 'Dashboard UI', sub: 'Realtime analytics' },
      { label: 'Workflow Studio', sub: 'Automation canvas' },
      { label: 'Media Grader', sub: 'Color & tone' },
      { label: 'Responsive App', sub: 'Mobile-first' },
      { label: 'CLI Toolkit', sub: 'DevOps console' },
      { label: 'Component Lib', sub: 'Design system' },
    ],
  },
  about: {
    heading: 'About me',
    copy: "With a Bachelor's degree in Software Engineering (87% GPA) and extensive dual-domain experience across engineering development and humanitarian operations with bodies like Save the Children, I manage scalable automation layers and robust digital architectures. Let's engineer something impact-driven.",
  },
  services: {
    heading: 'Services',
    subtitle:
      'Four disciplines, one operator — engineered for impact across the full delivery lifecycle.',
    items: [
      {
        title: 'Software Engineering & Architecture',
        desc: 'Full-stack development mapping modern systems, APIs, and decoupled modular architectures.',
      },
      {
        title: 'AI Automation & Orchestration',
        desc: 'Engineering autonomous multi-agent systems using frameworks like CrewAI to automate end-to-end data pipelines.',
      },
      {
        title: 'Multimedia Production & Editing',
        desc: 'High-impact visual storytelling, advanced photography, and professional digital asset grading.',
      },
      {
        title: 'Project Coordination & DevOps',
        desc: 'Managing continuous deployment workflows, monitoring field logistics, and assuring operational excellence under rigorous deadlines.',
      },
    ],
  },
  projects: {
    heading: 'Projects',
    subtitle: 'A stacking deck of shipped systems — scroll to flip through.',
    viewLive: 'View Live Project',
    items: [
      {
        title: 'CrewAI Automation Suite',
        desc: 'Multi-agent orchestration layer driving real-time web-scraping pipelines and interactive data analysis modules.',
        tags: ['CrewAI', 'Python', 'Realtime', 'Data Analysis'],
      },
      {
        title: 'NextLevel Studio Systems',
        desc: 'Clean production-grade application engineered for scalable media workflow distribution.',
        tags: ['React', 'TypeScript', 'Media', 'Workflow'],
      },
      {
        title: 'Humanitarian Logistical Hubs',
        desc: 'Specialized data analytics interface helping streamline multi-site parcel monitoring systems.',
        tags: ['Analytics', 'Logistics', 'Dashboards', 'Field Ops'],
      },
    ],
  },
  contact: {
    kicker: "Let's build",
    heading: 'something impact-driven',
    subtitle:
      'A Software Engineer & Multimedia Specialist — open to ambitious automation, product, and visual work.',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    rights: 'All rights reserved.',
    availability: 'Available worldwide · remote',
  },
};

const ar: Dict = {
  toggle: 'EN',
  toggleAria: 'تغيير اللغة إلى الإنجليزية',
  nav: { about: 'عنّي', services: 'الخدمات', projects: 'المشاريع', contact: 'تواصل' },
  hero: {
    line1: 'مرحبًا، أنا',
    line2: 'مجدالله',
    subtitle:
      'مهندس برمجيات ومتخصّص وسائط متعددة، أبتكر أنظمة أتمتة بمستوى إنتاجي ومنصّات بصرية لا تُنسى.',
    scroll: 'مرّر',
    contact: 'تواصل معي',
  },
  marquee: {
    heading: 'مختارات من الأعمال',
    engineering: [
      { label: 'واجهات برمجية معيارية', sub: 'خدمات منفصلة' },
      { label: 'شبكة وكلاء متعددين', sub: 'تنسيق CrewAI' },
      { label: 'خطوط CI / CD', sub: 'تسليم مستمر' },
      { label: 'خطوط بيانات', sub: 'استخلاص ودمج' },
      { label: 'تصميم الأنظمة', sub: 'طبقات قابلة للتوسّع' },
      { label: 'حوسبة طرفية', sub: 'زمن استجابة منخفض' },
    ],
    screens: [
      { label: 'واجهة لوحة تحكّم', sub: 'تحليلات فورية' },
      { label: 'استوديو سير العمل', sub: 'لوحة أتمتة' },
      { label: 'معالج الوسائط', sub: 'اللون والدرجة' },
      { label: 'تطبيق متجاوب', sub: 'يبدأ من الجوال' },
      { label: 'أدوات سطر الأوامر', sub: 'وحدة DevOps' },
      { label: 'مكتبة مكوّنات', sub: 'نظام تصميم' },
    ],
  },
  about: {
    heading: 'عنّي',
    copy: 'بشهادة بكالوريوس في هندسة البرمجيات (بمعدّل 87%) وخبرة واسعة مزدوجة المجال تمتدّ عبر تطوير البرمجيات والعمليات الإنسانية مع جهات مثل Save the Children، أُدير طبقات أتمتة قابلة للتوسّع وبُنى رقمية متينة. لنهندس معًا شيئًا ذا أثر.',
  },
  services: {
    heading: 'الخدمات',
    subtitle: 'أربعة تخصّصات، مشغّل واحد — مُهندَسة لإحداث الأثر عبر دورة التسليم الكاملة.',
    items: [
      {
        title: 'هندسة البرمجيات والمعمارية',
        desc: 'تطوير متكامل يرسم الأنظمة الحديثة وواجهات البرمجة والمعماريات المعيارية المنفصلة.',
      },
      {
        title: 'أتمتة وتنسيق الذكاء الاصطناعي',
        desc: 'هندسة أنظمة وكلاء متعددين ذاتية باستخدام أطر مثل CrewAI لأتمتة خطوط البيانات من طرفٍ إلى طرف.',
      },
      {
        title: 'إنتاج ومونتاج الوسائط المتعددة',
        desc: 'سرد بصري عالي التأثير، وتصوير متقدّم، ومعالجة احترافية للأصول الرقمية.',
      },
      {
        title: 'تنسيق المشاريع و DevOps',
        desc: 'إدارة سير عمل النشر المستمر، ومراقبة اللوجستيات الميدانية، وضمان التميّز التشغيلي ضمن مواعيد صارمة.',
      },
    ],
  },
  projects: {
    heading: 'المشاريع',
    subtitle: 'مجموعة متراكمة من الأنظمة المُنجَزة — مرّر للتنقّل.',
    viewLive: 'عرض المشروع',
    items: [
      {
        title: 'حزمة أتمتة CrewAI',
        desc: 'طبقة تنسيق وكلاء متعددين تُشغّل خطوط سحب بيانات الويب الفورية ووحدات تحليل بيانات تفاعلية.',
        tags: ['CrewAI', 'بايثون', 'فوري', 'تحليل بيانات'],
      },
      {
        title: 'أنظمة NextLevel Studio',
        desc: 'تطبيق نظيف بمستوى إنتاجي مُهندَس لتوزيع سير عمل وسائط قابل للتوسّع.',
        tags: ['React', 'TypeScript', 'وسائط', 'سير عمل'],
      },
      {
        title: 'مراكز لوجستية إنسانية',
        desc: 'واجهة تحليلات بيانات متخصّصة تساعد في تبسيط أنظمة مراقبة الطرود متعددة المواقع.',
        tags: ['تحليلات', 'لوجستيات', 'لوحات تحكّم', 'عمليات ميدانية'],
      },
    ],
  },
  contact: {
    kicker: 'لنبدأ',
    heading: 'شيئًا ذا أثر',
    subtitle:
      'مهندس برمجيات ومتخصّص وسائط متعددة — منفتح على مشاريع الأتمتة والمنتجات والأعمال البصرية الطموحة.',
    email: 'البريد',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    rights: 'جميع الحقوق محفوظة.',
    availability: 'متاح عالميًا · عن بُعد',
  },
};

const DICTS: Record<Lang, Dict> = { en, ar };

interface LangContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: Dict;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    root.classList.toggle('lang-ar', lang === 'ar');
  }, [lang, dir]);

  const toggle = useCallback(
    () => setLang((prev) => (prev === 'en' ? 'ar' : 'en')),
    [],
  );

  const value = useMemo<LangContextValue>(
    () => ({ lang, dir, t: DICTS[lang], toggle, setLang }),
    [lang, dir, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = (): LangContextValue => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within a LangProvider');
  return ctx;
};
