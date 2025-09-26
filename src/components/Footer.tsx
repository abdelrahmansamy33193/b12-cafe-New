import { useTranslation } from 'react-i18next'
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si'

export default function Footer(){
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container">
        <div className="cols">
          <div>
            <img src="/images/logo.svg" alt="logo" style={{height:40}} loading="lazy" />
            <p style={{opacity:.9, marginTop:12, maxWidth:420}}>
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4>{t('footer.company')}</h4>
            <ul style={{listStyle:'none', padding:0, margin:0, lineHeight:'28px'}}>
              <li><a href="/about">{t('footer.links.about')}</a></li>
              <li><a href="/contact">{t('footer.links.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.explore')}</h4>
            <ul style={{listStyle:'none', padding:0, margin:0, lineHeight:'28px'}}>
              <li><a href="/menu">{t('footer.links.menu')}</a></li>
              <li><a href="/locations">{t('footer.links.locations')}</a></li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.follow')}</h4>
            <nav className="social-icons" aria-label={t('footer.follow')}>
              <a
                href="https://www.instagram.com/b12.eg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social.instagram')}
                className="icon"
                title={t('footer.social.instagram')}
              >
                <SiInstagram />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61571054160777&sk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social.facebook')}
                className="icon"
                title={t('footer.social.facebook')}
              >
                <SiFacebook />
              </a>

              <a
                href="https://wa.me/201060014684?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%B7%D9%84%D8%A8%20%D9%85%D9%86%20B12%20Cafe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social.whatsapp')}
                className="icon whatsapp"
                title={t('footer.social.whatsapp')}
              >
                <SiWhatsapp />
              </a>
            </nav>
          </div>
        </div>

        <div style={{marginTop:24, opacity:.7, fontSize:14}}>
          © {new Date().getFullYear()} B12 Cafe. {t('footer.legal')}
        </div>
      </div>
    </footer>
  )
}
