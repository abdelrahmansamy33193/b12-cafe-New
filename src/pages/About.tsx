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
              Welcome to B12 Café – where every cup tells a story. We believe in creating a unique
              experience for our customers by offering special blends, cozy vibes, and unforgettable
              moments.
              <br /><br />
              Our mission is simple: Be Special. At B12 Café, it’s not just about coffee, it’s about
              community, passion, and making every visit memorable..
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
