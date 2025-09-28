import React from 'react'
import { useTranslation } from 'react-i18next'

export default function About(){
  const { t } = useTranslation()

  return (
    <>
      {/* فيديو الخلفية فقط */}
      <section className="about-hero" aria-hidden="true">
        <video
          className="about-bg-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/about-bg.jpg"
          preload="metadata"
        >
          <source src="/assets/about-bg.mp4" type="video/mp4" />
        </video>
        <div className="about-overlay" />
      </section>

      {/* المحتوى تحت الفيديو */}
      <main className="section">
        <div className="container">
          <h1 className="section-title">{t('about.title')}</h1>
          <p className="section-sub">{t('about.sub')}</p>

          <div className="card">
            <p>
  {t('about.blurb_p1')}
  <br /><br />
  {t('about.blurb_p2')}
</p>

          </div>
        </div>
      </main>
    </>
  )
}
