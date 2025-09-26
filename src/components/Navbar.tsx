import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'
import useTheme from '../hooks/useTheme'
import React from 'react'

export default function Navbar(){
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = React.useState(false)

  const toggleLang = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }
  const closeMenu = () => setOpen(false)

  // اقفل سكرول الصفحة لما المينيو مفتوحة
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className="nav">
      <div className="bar container">
        <div className="left">
          <Link to="/" className="logo" aria-label="B12 Cafe — Home">
  <picture>
    {/* SVG (مع كسر كاش) */}
    <source srcSet="/images/logo.svg?v=3" type="image/svg+xml" />
    {/* Fallback PNG لو SVG ما اشتغلش على الموبايل */}
    <img
      src="/images/b12-logo.png?v=3"
      alt="B12 Cafe"
      height={36}
      width={36}
      loading="eager"           // مهم: ممنوع lazy للّوجو
      decoding="async"
      style={{ display: 'block' }}
    />
  </picture>
  <div>
    <div className="brand">{t('brand')}</div>
    <div className="slogan">{t('slogan')}</div>
  </div>
</Link>

        </div>

        {/* روابط الديسكتوب + لوحة الموبايل */}
        <div id="nav-links" className={`links ${open ? 'open' : ''}`}>
          <NavLink to="/menu" onClick={closeMenu}>{t('nav.menu')}</NavLink>
          <NavLink to="/about" onClick={closeMenu}>{t('nav.about')}</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>{t('nav.contact')}</NavLink>

          <button className="btn ghost icon-btn" onClick={toggle} aria-label={t('common.theme')} title={t('common.theme')}>
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
          onClick={() => setOpen(v => !v)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  )
}
