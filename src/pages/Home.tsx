import PromoCard from '../components/PromoCard'
import Newsletter from '../components/Newsletter'
import { useTranslation } from 'react-i18next'

export default function Home(){
  const { t } = useTranslation()
  return (
    <main>
      <section className="hero">
        <div className="container content">
          <div className="badge">{t('home.badge')}</div>
          <h1 className="hero-title">{t('home.headline')}</h1>
          <p className="section-sub" style={{maxWidth:640}}>{t('home.sub')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('home.featured')}</h2>
          <p className="section-sub">{t('home.featuredSub')}</p>
          <div className="grid grid-3">
            <PromoCard title="Marshmallow , Raspberry" subtitle="Magical taste , Limited time." image="/images/promo1.jpg" />
            <PromoCard title="Tuna brown baguette" subtitle="Not just a Sandwichs." image="/images/promo2.jpg" secondary="Fan Favorite"/>
            <PromoCard title="Beach de lait" subtitle="Where Summer Meets Creaminess." image="/images/promo3.jpg" />
          </div>
        </div>
      </section>

      {/* Get the App */}


      <Newsletter />

      <section className="section">
        <div className="container card" style={{display:'grid', gridTemplateColumns:'.9fr 1.1fr', alignItems:'center', gap:24}}>
          <img src="/images/store.jpg" style={{width:'70%', borderRadius:16}} alt="store" loading="lazy"/>
          <div>
            <h3 className="section-title">{t('home.storeLocator')}</h3>
            <p className="section-sub">{t('home.storeLocatorSub')}</p>
            <a className="btn" href="/locations">Find Stores</a>
          </div>
        </div>
      </section>
    </main>
  )
}
