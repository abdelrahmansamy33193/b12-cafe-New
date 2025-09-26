import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'
import useReveal from './hooks/useReveal' // <-- أنيميشن الدخول

const Home = React.lazy(() => import('./pages/Home'))
const Menu = React.lazy(() => import('./pages/Menu'))
const About = React.lazy(() => import('./pages/About'))
const Contact = React.lazy(() => import('./pages/Contact'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

export default function App(){
  const { i18n } = useTranslation()

  // تفعيل الأنيميشن لكل العناصر اللي عليها data-reveal
  useReveal()

  React.useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <div className="app">
      <Navbar />

      {/* اطلع لأعلى الصفحة عند تغيير المسار */}
      <ScrollToTop smooth />

      <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* زر واتساب العائم */}
      <FloatingWhatsApp
        phone="201060014684"
        message="مرحبًا، أريد الطلب من B12 Cafe."
      />

      <Footer />
    </div>
  )
}
