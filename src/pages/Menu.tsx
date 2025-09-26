import React from 'react'
import { useTranslation } from 'react-i18next'

type Page = { src: string; title: string }

const PAGES: Page[] = [
  { src: '/images/menu-pages/menu1.jpg', title: 'Sandwich / Croissant / Salad' },
  { src: '/images/menu-pages/menu2.jpg', title: 'Hot Drinks & Tea' },
  { src: '/images/menu-pages/menu3.jpg', title: 'Hot Chocolate / Ice Coffee' },
  { src: '/images/menu-pages/menu4.jpg', title: 'Boba & Frappe' },
  { src: '/images/menu-pages/menu5.jpg', title: 'Smoothie & Milkshake' },
  { src: '/images/menu-pages/menu6.jpg', title: 'Fresh Juices & Cocktails' },
  { src: '/images/menu-pages/menu7.jpg', title: 'Mojito & Soft Drinks' },
  { src: '/images/menu-pages/menu8.jpg', title: 'Waffle & Croffel' },
  { src: '/images/menu-pages/menu9.jpg', title: 'Bakery & Additions' },
]

export default function Menu(){
  const { t } = useTranslation()
  const [open, setOpen] = React.useState<number | null>(null)

  // تنقّل بالكيبورد داخل اللايتبوكس
  React.useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen(i => (i! + 1) % PAGES.length)
      if (e.key === 'ArrowLeft')  setOpen(i => (i! - 1 + PAGES.length) % PAGES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">{t('menu.title')}</h1>
        <p className="section-sub">{t('menu.sub')}</p>

        {/* شبكة الصفحات (ثَمبنيلز صغيرة) */}
        <div className="menu-pages">
          {PAGES.map((p, i) => (
            <figure key={p.src} className="menu-page">
              <button
                className="menu-thumb"
                onClick={() => setOpen(i)}
                aria-label={`Open ${p.title}`}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </button>
              <figcaption>{p.title}</figcaption>
            </figure>
          ))}
        </div>

        {/* Lightbox */}
        {open !== null && (
          <div
            className="lightbox"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="lightbox-btn prev"
              onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + PAGES.length) % PAGES.length) }}
              aria-label="Previous"
            >‹</button>

            <img
              src={PAGES[open].src}
              alt={PAGES[open].title}
              onClick={(e) => e.stopPropagation()}
              // عرض الصورة بالحجم الطبيعي بدون تكبير زائد
              style={{
                width: 'auto',
                maxWidth: 'min(95vw, 1100px)',
                maxHeight: '90vh',
                borderRadius: 12,
                boxShadow: '0 20px 60px rgba(0,0,0,.4)'
              }}
            />

            <button
              className="lightbox-btn next"
              onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % PAGES.length) }}
              aria-label="Next"
            >›</button>

            <button
              className="lightbox-close"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >×</button>
          </div>
        )}
      </div>
    </main>
  )
}
