import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer(){
  const { t } = useTranslation()

  // نفس فكرة النافبار: سلسلة فولباك للّوجو
  const FALLBACKS = [
    '/images/logo.svg?v=7',
    '/images/b12-logo.png?v=7',
    '/images/b12-logo.jpg?v=7',
    '/images/favicon.svg?v=7',
  ]
  const [idx, setIdx] = React.useState(0)

  return (
    <footer className="footer">
      <div className="container">
        <div className="cols">
          {/* العمود الأول: الهوية + نبذة */}
          <div>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <img
                src={FALLBACKS[idx]}
                alt="B12 Cafe"
                height={40}
                width={40}
                loading="eager"        // مهم: بدون lazy في اللوجو
                decoding="async"
                style={{ display:'block' }}
                onError={() => setIdx(i => Math.min(i + 1, FALLBACKS.length - 1))}
              />
              <div>
                <div style={{fontWeight:800, letterSpacing:.5}}>{t('brand')}</div>
                <div style={{fontSize:12, opacity:.9}}>{t('slogan')}</div>
              </div>
            </div>

            <p style={{opacity:.9, marginTop:12, maxWidth:420}}>
              Premium cafe experiences. El-Galaa ,Tanta, Gharbia Governorate, Egypt
            </p>
          </div>

          {/* Company */}
          <div>
            <h4>Company</h4>
            <ul style={{listStyle:'none', padding:0, margin:0, lineHeight:'28px'}}>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4>Explore</h4>
            <ul style={{listStyle:'none', padding:0, margin:0, lineHeight:'28px'}}>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/locations">Store Locator</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4>Follow</h4>
            <nav className="social-icons" aria-label="Social media">
              {/* Instagram */}
              <a href="https://www.instagram.com/b12.eg" target="_blank" rel="noopener" aria-label="Instagram" className="icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5.2" />
                  <circle cx="17.4" cy="6.6" r="1.2" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61571054160777&sk" target="_blank" rel="noopener" aria-label="Facebook" className="icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.5 1.7-1.5h1.1V5c-.6-.1-1.3-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2H8v3h2.5v7h3z"/>
                </svg>
              </a>
            </nav>
          </div>
        </div>

        <div style={{marginTop:24, opacity:.7, fontSize:14}}>
          © {new Date().getFullYear()} B12 Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
