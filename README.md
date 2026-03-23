# jonathanruiz.net

Personal portfolio site for Jonathan Ruiz — Sr. Product Design Manager at Docusign.

Built with Astro, Tailwind CSS, and Claude Code. Hosted on Vercel. Zero monthly hosting costs.

**[→ View the live site](https://jonathanruiz.net)**

---

## What's inside

A portfolio site that doubles as a Vibe Coding experiment with production-quality code using AI tools.

**Features**
- WebGL dot grid animation in the hero — interactive, cursor-reactive, works in light and dark mode
- AI chat widget powered by Claude API — trained on my background, work, and thinking
- Light and dark mode with localStorage persistence
- Fully accessible — WCAG AA compliant, skip nav, ARIA labels, focus styles throughout
- SEO optimized — Open Graph meta tags, JSON-LD Person schema, sitemap, robots.txt
- Vercel Analytics — privacy-friendly, no cookies, no consent banners
- Separate pages for Work, About, Leadership, Resume, and Styleguide
- Coming soon placeholders for case studies in progress

---

## Stack

| Layer | Tool |
|---|---|
| Framework | [Astro](https://astro.build) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Components | Astro + React islands |
| Icons | [Lucide](https://lucide.dev) |
| Fonts | DM Sans + DM Mono (Google Fonts) |
| AI Chat | [Anthropic Claude API](https://anthropic.com) |
| Animation | WebGL (vanilla, no library) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Hosting | [Vercel](https://vercel.com) (free) |
| Built with | [Claude Code](https://claude.ai/code) |

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/jonathanruizg/jonathanruiz-portfolio.git
cd jonathanruiz-portfolio

# Install dependencies
npm install

# Add your environment variables
cp .env.example .env
# → Add your ANTHROPIC_API_KEY to .env

# Start the dev server
npm run dev
```

Open **http://localhost:4321** in your browser.

---

## Environment variables

```bash
# .env
ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key at [console.anthropic.com](https://console.anthropic.com).

---

## Project structure

```
src/
├── components/
│   ├── chat/
│   │   └── ChatWidget.tsx      ← AI chat (React island)
│   ├── sections/
│   │   ├── Hero.astro          ← WebGL animation + headline
│   │   ├── About.astro         ← Bio + currently section
│   │   ├── Work.astro          ← Case study list
│   │   ├── Community.astro     ← Community cards
│   │   └── VibeCoding.astro    ← Side projects
│   └── ui/
│       ├── Sidebar.astro       ← Navigation
│       └── Footer.astro
├── layouts/
│   └── Layout.astro            ← Base layout + dark mode + analytics
├── pages/
│   ├── index.astro             ← Home
│   ├── about.astro             ← Full about page
│   ├── leadership.astro        ← Leadership philosophy
│   ├── styleguide.astro        ← Design system docs
│   ├── resume.astro            ← One-page resume (prerendered)
│   ├── work/
│   │   ├── index.astro         ← Work listing
│   │   ├── ink.astro           ← Docusign Ink (coming soon)
│   │   ├── mobile-apps.astro   ← Docusign Mobile (coming soon)
│   │   ├── glint.astro         ← Glint (coming soon)
│   │   └── shazam-tv.astro     ← Shazam TV (coming soon)
│   └── api/
│       └── chat.ts             ← Claude API proxy
├── styles/
│   └── global.css              ← Design tokens + global styles
public/
├── books/                      ← Local book cover images
├── JRU-black.svg               ← Logo (light mode)
├── JRU-white.svg               ← Logo (dark mode)
├── JR-Headshot-Circular.png    ← Headshot
├── favicon.svg
├── robots.txt
└── resume.html                 ← Standalone resume (legacy)
```

---

## Styleguide

The site uses a token-based design system with CSS custom properties for seamless light/dark mode switching.

```css
/* Accent colors */
--accent: #FF5F40;        /* Primary orange */
--accent-slate: #435663;  /* Secondary slate blue (WebGL dots, light mode) */

/* Backgrounds */
--bg:   #F8F8F6  /* light */  /  #0A0A08  /* dark */
--bg-2: #EFEFEC              /  #141412
--bg-3: #E5E5E1              /  #1C1C1A

/* Text hierarchy */
--text:   #0A0A08  /* primary */
--text-2: #3D3D3A  /* secondary */
--text-3: #767672  /* muted — labels/captions only */
```

See the full design system at [jonathanruiz.net/styleguide](https://jonathanruiz.net/styleguide).

---

## Deployment

The site deploys automatically to Vercel on every push to `main`.

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

To deploy your own version, import the repo into [Vercel](https://vercel.com) and add your
`ANTHROPIC_API_KEY` as an environment variable in the project settings.

---

## About

**Jonathan Ruiz** is a Husband, Father of two, Sr. Product Design Manager at Docusign and co-leader of Friends of Figma Miami.

This site was designed and built using Claude Code.

- **Portfolio:** [jonathanruiz.net](https://jonathanruiz.net)
- **LinkedIn:** [linkedin.com/in/jonaruiz](https://linkedin.com/in/jonaruiz)
- **Email:** jonathanruizg@me.com

---

*"Whatever you do, work at it with all your heart." — Colossians 3:23*
