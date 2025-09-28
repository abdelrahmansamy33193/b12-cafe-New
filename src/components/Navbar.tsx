import React from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'
import useTheme from '../hooks/useTheme'

export default function Navbar(){
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = React.useState(false)
  const { pathname } = useLocation()              // نتابع تغيّر المسار

  // نبدأ بـ SVG ومع أول خطأ نتحول لنسخة PNG
  const [logoSrc, setLogoSrc] = React.useState('/images/logo.svg?v=6')

  const toggleLang = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
    setOpen(false) // أقفل المنيو على الموبايل بعد تغيير اللغة
  }

  const toggleMenu = () => setOpen(v => !v)
  const closeMenu  = () => setOpen(false)

  // اقفل المنيو تلقائيًا عند التنقّل لأي صفحة
  React.useEffect(() => { setOpen(false) }, [pathname])

  // امنع السكرول لما المنيو مفتوحة (أفضل على html بدل body)
  React.useEffect(() => {
    const el = document.documentElement
    const prev = el.style.overflow
    el.style.overflow = open ? 'hidden' : prev || ''
    return () => { el.style.overflow = prev || '' }
  }, [open])

  // اقفال Escape
  const onLinksKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') closeMenu()
  }

  // الضغط على الخلفية البيضاء داخل اللوحة (مساحة فاضية) يقفلها
  const onLinksClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeMenu()
  }

  return (
    <nav className="nav">
      <div className="bar container">
        <div className="left">
          <Link to="/" className="logo" aria-label="B12 Cafe — Home" onClick={closeMenu}>
            <img
              src={logoSrc}
              alt="B12 Cafe"
              height={36}
              width={36}
              loading="eager"
              decoding="async"
              style={{ display: 'block' }}
              onError={() => setLogoSrc('/images/b12-logo.png?v=6')}
            />
            <div>
              <div className="brand">{t('brand')}</div>
              <div className="slogan">{t('slogan')}</div>
            </div>
          </Link>
        </div>

        {/* روابط الديسكتوب + لوحة الموبايل */}
        <div
          id="nav-links"
          className={`links ${open ? 'open' : ''}`}
          onKeyDown={onLinksKeyDown}
          onClick={onLinksClick}
          aria-hidden={!open}
        >
          <NavLink to="/menu" onClick={closeMenu}>{t('nav.menu')}</NavLink>
          <NavLink to="/about" onClick={closeMenu}>{t('nav.about')}</NavLink>
          <NavLink to="/events" onClick={closeMenu}>{t('nav.events','Events')}</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>{t('nav.contact')}</NavLink>

          <button
            className="btn ghost icon-btn"
            onClick={() => { toggle(); closeMenu(); }}
            aria-label={t('common.theme')}
            title={t('common.theme')}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <button className="btn ghost" onClick={toggleLang} aria-label="Change language">
            {t('common.lang')}
          </button>
        </div>

        {/* زر الهامبرجر (موبايل فقط) */}
        <button
          className="menu-btn"
          aria-label="Toggle menu"
          aria-controls="nav-links"
          aria-expanded={open}
          onClick={toggleMenu}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  )
}
