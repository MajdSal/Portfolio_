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
      { label: 'Django Back-Ends', sub: 'REST & MVT' },
      { label: 'AI Feature Modules', sub: 'Integrated in-product' },
      { label: 'n8n Automation', sub: 'Recurring work, handled' },
      { label: 'Relational Data', sub: 'Schemas & queries' },
      { label: 'Technical Writing', sub: 'English & Arabic' },
      { label: 'Algorithms & DS', sub: 'Core foundations' },
    ],
    screens: [
      { label: 'Masar Dashboard', sub: 'Enterprise management' },
      { label: 'Frameline Hero', sub: 'Three.js scroll' },
      { label: 'Photography & Edit', sub: 'Rai.it · IMEU' },
      { label: 'Responsive Web', sub: 'Mobile-first' },
      { label: 'GLSL Shaders', sub: 'Custom glass material' },
      { label: 'Workflow Platform', sub: 'SaaS for software teams' },
    ],
  },
  about: {
    heading: 'About me',
    copy: "I'm a Software Engineering student at Al-Azhar University of Gaza, 87% GPA. I build the AI layer of Workflow, and shipped the Python and AI side of Masar in a six-member team at TAQAT Academy — final evaluation 99.6%. Between builds I've run field logistics for Save the Children. Let's engineer something impact-driven.",
  },
  services: {
    heading: 'Services',
    subtitle:
      'Four disciplines, one operator — engineered for impact across the full delivery lifecycle.',
    items: [
      {
        title: 'Backend & Web Development',
        desc: 'Django and Python back-ends — REST API integration, relational data models and MVT architecture. The stack behind Masar, delivered inside a six-member team.',
      },
      {
        title: 'AI Integration & Workflow Automation',
        desc: 'AI modules built into existing products, prompt design, and n8n flows that take over recurring project and team-management work — the layer I build at Workflow.',
      },
      {
        title: 'Interactive Web & Motion',
        desc: 'Three.js and WebGL front-ends with custom GLSL shaders, profiled on real hardware — like the scroll experience behind the Frameline studio site.',
      },
      {
        title: 'Multimedia Production & Technical Writing',
        desc: 'Photography, editing and script writing for international media and NGOs, plus system documentation and technical reports in English and Arabic.',
      },
    ],
  },
  projects: {
    heading: 'Top Projects',
    subtitle: 'A stacking deck of shipped systems — scroll to flip through.',
    viewLive: 'View Live Project',
    items: [
      {
        title: 'Workflow',
        desc: 'The AI module of a SaaS platform for managing software companies — built alongside the engineering team, with n8n flows that take over recurring project and team-management work for subscribers.',
        tags: ['Python', 'AI Integration', 'n8n', 'SaaS'],
      },
      {
        title: 'Masar',
        desc: 'The Python and AI components of an enterprise management platform, built inside a six-member team during field training at TAQAT Academy. Final evaluation: 99.6%.',
        tags: ['Python', 'Django', 'Team of 6', 'TAQAT Academy'],
      },
      {
        title: 'Frameline',
        desc: 'The site for a cinematic production house in Gaza. Its hero is a Three.js scroll piece — twelve glass rods braid along an image-anchored path, then erode into tumbling shards and streaming glass dust.',
        tags: ['Three.js', 'WebGL', 'GLSL Shaders', 'Motion'],
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
      { label: 'واجهات خلفية بـ Django', sub: 'REST و MVT' },
      { label: 'وحدات ذكاء اصطناعي', sub: 'مدمجة داخل المنتج' },
      { label: 'أتمتة n8n', sub: 'المهام المتكرّرة تلقائيًا' },
      { label: 'بيانات علائقية', sub: 'مخطّطات واستعلامات' },
      { label: 'كتابة تقنية', sub: 'بالعربية والإنجليزية' },
      { label: 'خوارزميات وبنى بيانات', sub: 'أساسات صلبة' },
    ],
    screens: [
      { label: 'لوحة «مسار»', sub: 'إدارة مؤسسية' },
      { label: 'واجهة Frameline', sub: 'سكرول بـ Three.js' },
      { label: 'تصوير ومونتاج', sub: 'Rai.it · IMEU' },
      { label: 'ويب متجاوب', sub: 'يبدأ من الجوال' },
      { label: 'شيدرات GLSL', sub: 'خامة زجاج مخصّصة' },
      { label: 'منصّة Workflow', sub: 'SaaS لشركات البرمجيات' },
    ],
  },
  about: {
    heading: 'عنّي',
    copy: 'أنا طالب هندسة برمجيات في جامعة الأزهر بغزة، بمعدّل 87%. أبني طبقة الذكاء الاصطناعي في Workflow، وسلّمت مكوّنات بايثون والذكاء الاصطناعي في «مسار» ضمن فريق من ستة أعضاء في أكاديمية طاقات — بتقييم نهائي 99.6%. وبين المشاريع أدرت لوجستيات ميدانية مع Save the Children. لنهندس معًا شيئًا ذا أثر.',
  },
  services: {
    heading: 'الخدمات',
    subtitle: 'أربعة تخصّصات، مشغّل واحد — مُهندَسة لإحداث الأثر عبر دورة التسليم الكاملة.',
    items: [
      {
        title: 'تطوير الواجهات الخلفية والويب',
        desc: 'واجهات خلفية بـ Django وبايثون — دمج واجهات REST، ونماذج بيانات علائقية، ومعمارية MVT. هي البنية التي قامت عليها «مسار»، وسُلّمت ضمن فريق من ستة أعضاء.',
      },
      {
        title: 'دمج الذكاء الاصطناعي وأتمتة سير العمل',
        desc: 'وحدات ذكاء اصطناعي تُدمج داخل منتجات قائمة، وتصميم الموجّهات، وتدفّقات n8n تتولّى المهام المتكرّرة في إدارة المشاريع والفرق — وهي الطبقة التي أبنيها في Workflow.',
      },
      {
        title: 'الويب التفاعلي والحركة',
        desc: 'واجهات أمامية بـ Three.js وWebGL مع شيدرات GLSL مخصّصة، مُقاسة على عتاد حقيقي — مثل تجربة السكرول في موقع استوديو Frameline.',
      },
      {
        title: 'الإنتاج المرئي والكتابة التقنية',
        desc: 'تصوير ومونتاج وكتابة نصوص لجهات إعلامية دولية ومنظمات غير حكومية، إضافة إلى توثيق الأنظمة والتقارير التقنية بالعربية والإنجليزية.',
      },
    ],
  },
  projects: {
    heading: 'أبرز المشاريع',
    subtitle: 'مجموعة متراكمة من الأنظمة المُنجَزة — مرّر للتنقّل.',
    viewLive: 'عرض المشروع',
    items: [
      {
        title: 'Workflow',
        desc: 'وحدة الذكاء الاصطناعي في منصّة SaaS لإدارة شركات البرمجيات — بُنيت مع فريق الهندسة، مع تدفّقات n8n تتولّى المهام المتكرّرة في إدارة المشاريع والفرق للمشتركين.',
        tags: ['بايثون', 'دمج الذكاء الاصطناعي', 'n8n', 'SaaS'],
      },
      {
        title: 'مسار',
        desc: 'مكوّنات بايثون والذكاء الاصطناعي في منصّة إدارة مؤسسية، بُنيت ضمن فريق من ستة أعضاء خلال التدريب الميداني في أكاديمية طاقات. التقييم النهائي: 99.6%.',
        tags: ['بايثون', 'جانغو', 'فريق من ٦', 'أكاديمية طاقات'],
      },
      {
        title: 'Frameline',
        desc: 'موقع استوديو إنتاج سينمائي في غزة. واجهته الرئيسية تجربة سكرول بـ Three.js — اثنا عشر قضيبًا زجاجيًا تتجدّل على مسار مثبّت على الصورة، ثم تتآكل إلى شظايا وغبار زجاجي متدفّق.',
        tags: ['Three.js', 'WebGL', 'شيدرات GLSL', 'حركة'],
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
