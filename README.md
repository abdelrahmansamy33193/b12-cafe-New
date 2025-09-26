# B12 Cafe (React + Vite)

> This is a **clean rebuild** in React with placeholder content and assets. Replace text, images, and links with your own.
> Designed for quick deployment on **Vercel**.

## Scripts
- `npm install`
- `npm run dev` (http://localhost:5173)
- `npm run build` (outputs to `dist/`)
- `npm run preview`

## Tech
- React 18 + Vite
- React Router v6
- Plain CSS with variables

## Structure
```
drcafe-clone-react/
  public/images/        # placeholder images & logo
  src/
    components/         # Navbar, Footer, PromoCard, Newsletter
    pages/              # Home, Menu, About, Locations, Careers, Contact
    styles/             # variables.css, globals.css
    App.jsx, main.jsx
  index.html
  vite.config.js
  vercel.json
```

## Deploy to Vercel
1. Push to GitHub (or upload project).
2. On Vercel: **New Project** → Import repo → Framework: Vite (auto) → Build Command: `npm run build` → Output: `dist`.
3. Add your custom domain if needed.

## Notes
- All images and brand marks are placeholders. Replace files in `public/images/`.
- Update colors in `src/styles/variables.css` to match your branding.
- Update Navbar texts, slogan, and footer info.

## Extras added
- TypeScript + strict tsconfig
- ESLint + Prettier configs
- i18n (English/Arabic) + RTL direction switch
- SEO meta + Open Graph + social image (`public/og-image.png`)
- Favicon set (`public/favicons/*`) + web manifest
- robots.txt + sitemap.xml
- React lazy routes + `loading="lazy"` on images
- Contact form wired to **Formspree** — replace `REPLACE_WITH_FORMSPREE_ID` in `Contact.tsx`
- Analytics:
  - Vercel Analytics auto-injected (`@vercel/analytics`)
  - GA4 placeholder in `index.html` (replace `G-MEASUREMENT_ID`)

### Formspree
1. Create a form at https://formspree.io
2. Replace the ID in `src/pages/Contact.tsx`: `REPLACE_WITH_FORMSPREE_ID`

### GA4
- Replace `G-MEASUREMENT_ID` in `index.html`

### Vercel Function (optional)
- `/api/contact.js` is a simple stub. Integrate with an email provider if you prefer backend handling.

