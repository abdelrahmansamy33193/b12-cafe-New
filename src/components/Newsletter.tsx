import { useTranslation } from 'react-i18next'
export default function Newsletter(){
  const { t } = useTranslation()
  return (
    <section className="section">
      <div className="container card" style={{display:'grid', gap:20, gridTemplateColumns:'1.2fr .8fr', alignItems:'center'}}>
        <div>
          <h3 className="section-title">{t('home.newsletterTitle')}</h3>
          <p className="section-sub">{t('home.newsletterSub')}</p>
          <div style={{display:'flex', gap:10}}>
            <input placeholder="Your email" style={{flex:1, padding:12, borderRadius:999, border:'1px solid #ddd'}}/>
            <button className="btn">Subscribe</button>
          </div>
        </div>
        <img src="/images/beans.jpg" alt="" style={{width:'100%', borderRadius:16}} loading="lazy"/>
      </div>
    </section>
  )
}