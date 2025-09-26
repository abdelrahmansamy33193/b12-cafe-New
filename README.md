# B12 Cafe — React + Vite (TypeScript)

> A production-ready, bilingual (AR/EN) café website starter: React 18 + Vite 5 + TypeScript, React Router, i18n (RTL), Dark Mode, mobile navbar, menu lightbox, floating WhatsApp, SEO files, and Vercel deploy config.

---

## ✨ Features

- **React 18 + Vite 5 + TypeScript**
- **React Router v6** (pages: Home, Menu, About, Contact, NotFound)
- **i18n via `react-i18next`** (Arabic/English) with automatic `lang`/`dir` switching
- **Dark Mode** using CSS variables + toggle (persisted in `localStorage`)
- **Glass Navbar** with desktop links & **mobile hamburger menu**
- **Menu gallery** with **lightbox** (keyboard: ← → Esc)
- **Floating WhatsApp** button
- **Reveal-on-scroll** animation (IntersectionObserver hook)
- **ScrollToTop** on route change
- **SEO**: meta, Open Graph, favicons, webmanifest, `robots.txt`, `sitemap.xml`
- **Analytics**: ready for **Vercel Analytics** and **GA4**
- Optional **Vercel Function** example for Contact form

---

## 🗂 Project Structure


├── api/
│ └── contact.js # (Optional) Vercel Function for contact form
├── public/
│ ├── favicons/ # Icons / app icons
│ ├── images/ # Placeholder assets (incl. menu-pages/)
│ ├── robots.txt
│ ├── sitemap.xml
│ └── site.webmanifest
├── src/
│ ├── components/
│ │ ├── FloatingWhatsApp.tsx
│ │ ├── Footer.tsx
│ │ ├── Navbar.tsx
│ │ ├── Newsletter.tsx
│ │ ├── PromoCard.tsx
│ │ └── ScrollToTop.tsx
│ ├── hooks/
│ │ ├── useReveal.ts
│ │ └── useTheme.ts
│ ├── i18n/
│ │ ├── ar.json
│ │ ├── en.json
│ │ └── index.ts
│ ├── pages/
│ │ ├── About.tsx
│ │ ├── Careers.tsx
│ │ ├── Contact.tsx
│ │ ├── Home.tsx
│ │ ├── Locations.tsx
│ │ ├── Menu.tsx
│ │ └── NotFound.tsx
│ ├── styles/
│ │ ├── globals.css
│ │ └── variables.css
│ ├── App.tsx
│ └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.(ts|js)
└── vercel.json

---

## 🔧 Requirements

- **Node.js 18–22**
- **npm** or **pnpm** (examples below use npm)

---

## 🚀 Getting Started

```bash
# install
npm install            # or: npm ci

# dev server
npm run dev            # http://localhost:5173

# production build
npm run build          # outputs to dist/

# preview production build locally
npm run preview        # http://localhost:4173


🌐 i18n & RTL

Text lives in src/i18n/en.json and src/i18n/ar.json.

Language toggle in Navbar updates document.documentElement.lang and dir (LTR/RTL).

Add/edit strings in the JSON files; components read via useTranslation().


🖤 Dark Mode

Implemented with CSS variables and a useTheme hook.

Toggle button in Navbar; preference saved to localStorage.

Override tokens under html[data-theme="dark"] in globals.css.


📱 Navbar (Mobile)

Desktop: inline links.

Mobile (<=900px): hamburger (.menu-btn) opens a full-width panel (.links.open).

Body scroll is locked while the menu is open.

🖼 Menu Gallery & Lightbox

Place images in public/images/menu-pages/.

Update the PAGES array in src/pages/Menu.tsx.

Thumbnails are responsive; lightbox supports keyboard navigation and closes on overlay click or Esc.


💬 Floating WhatsApp Button

Edit the phone and default message in src/components/FloatingWhatsApp.tsx:

🗺 Store Map

In src/pages/Contact.tsx, update the <iframe> inside .map-embed with your Google Maps embed URL.


🔍 SEO & Social

index.html contains <meta name="description"> & Open Graph tags.

Favicons + site.webmanifest under public/.

public/robots.txt and public/sitemap.xml provided — replace domain placeholders.

robots.txt:
User-agent: *
Allow: /
Sitemap: https://YOUR-DOMAIN/sitemap.xml

sitemap.xml (example):
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://YOUR-DOMAIN/</loc></url>
  <url><loc>https://YOUR-DOMAIN/menu</loc></url>
  <url><loc>https://YOUR-DOMAIN/about</loc></url>
  <url><loc>https://YOUR-DOMAIN/contact</loc></url>
</urlset>


📈 Analytics

Add GA4 to index.html if you use it (replace G-MEASUREMENT_ID).

Vercel Analytics can be enabled from the dashboard or by adding @vercel/analytics.


✉️ Contact Form (Options)

Option A — Vercel Function: api/contact.js
Send a POST request from your contact form to /api/contact, then forward via a mail provider (Resend/SendGrid/Mailgun) or webhook.

Option B — Formspree:
Use a direct form action:
<form action="https://formspree.io/f/XXXX" method="POST"> ... </form>


☁️ Deploy to Vercel

vercel.json (already included) ensures SPA routing and asset caching:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}


Dashboard

Import the GitHub repo on Vercel

Framework Preset: Vite

Build Command: npm run build

Output Directory: dist

Deploy 🎉

CLI (optional)
npm i -g vercel
vercel        # link project
vercel --prod # production deploy



🧪 QA Checklist

npm run build succeeds locally

npm run preview → test /, /menu, /about, /contact, refresh on inner routes (no 404)

Language toggle switches texts and dir

Dark Mode text is highly readable site-wide

Mobile navbar opens/closes; background scroll locks while open

Menu lightbox works (click/keyboard/escape)

WhatsApp button opens correct chat

SEO files updated with your real domain


🐛 Troubleshooting

404 on refresh for inner routes → ensure vercel.json exists (SPA rewrite).

Fonts/colors look off → adjust tokens in variables.css / overrides in globals.css.

Dark text too dim → tweak --text, --text-strong, --muted under html[data-theme="dark"].

Dev server can’t find assets → put public assets under public/ and reference them as /images/....


📜 License / Usage

This codebase is tailored for B12 Cafe with explicit permission to clone and customize.
© B12 Cafe. All rights reserved.