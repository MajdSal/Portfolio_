# Majdallah — 3D / Software Engineer Portfolio

A premium, ultra-dark single-page portfolio for **Majdallah** — Software
Engineer & Multimedia Specialist. Built with React + TypeScript, Tailwind CSS,
Framer Motion, and Lucide React, featuring a fully interactive canvas dot-mesh
backdrop (`<DotField />`).

## Stack

- **React 18 + TypeScript** (Vite)
- **Tailwind CSS 3** — design tokens, fluid `clamp()` typography
- **Framer Motion** — scroll-driven reveals, parallax marquee, sticky card deck
- **Lucide React** — iconography
- **Kanit** (Latin) + **Cairo** (Arabic) — Google Fonts, weights 300–900
- **Bilingual EN / AR** — a navbar toggle flips the whole page between English
  (LTR) and Arabic (RTL). All copy lives in [`src/i18n.tsx`](src/i18n.tsx); the
  design, colors, and animations are identical in both directions.

## Getting started

```bash
npm install
npm run dev      # start the dev server (opens http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Add your portrait

The hero loads the portrait from `public/`:

```
public/profile image 2025-07-10 at 17.41.05_0c45143f.png
```

If that file is ever missing, the hero gracefully falls back to
`public/avatar-fallback.svg`. Replace the file (keep the name) to swap the photo.

## Structure

```
src/
├── App.tsx                 # page composition
├── index.css               # tokens, .hero-heading gradient, base styles
├── components/
│   ├── DotField.tsx        # interactive canvas dot-mesh background
│   ├── Magnet.tsx          # cursor-magnet wrapper (padding / strength)
│   ├── ContactButton.tsx   # gradient pill CTA
│   ├── LiveProjectButton.tsx
│   └── Navbar.tsx
└── sections/
    ├── Hero.tsx            # h-screen hero + central magnetic portrait
    ├── MarqueeGrid.tsx     # 2 scroll-velocity parallax rows
    ├── About.tsx           # scroll-driven word reveal + floating glyphs
    ├── Services.tsx        # white, top-rounded, numbered list
    ├── Projects.tsx        # sticky stacking card deck
    └── Contact.tsx         # CTA + footer
```

## Design tokens

| Token            | Value                                              |
| ---------------- | -------------------------------------------------- |
| Base             | `#0C0C0C`                                           |
| Glass nav text   | `#D7E2EA`                                           |
| Hero gradient    | `linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` |
| CTA gradient     | `linear-gradient(123deg, #18011F, #B600A8, #7621B0, #BE4C00)` |
| Accents          | soft pink `#E9A8C9`, corporate blue `#7FA8C9`, deep navy `#0A1626` |
