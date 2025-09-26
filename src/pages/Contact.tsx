import { useTranslation } from 'react-i18next'
import React from 'react'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact(){
  const { t } = useTranslation()
  const [status, setStatus] = React.useState<Status>('idle')
  const [error, setError] = React.useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)
    // honeypot
    if ((data.get('website') as string)?.length) {
      setStatus('success') // تجاهل السبام
      form.reset()
      return
    }
    const payload = Object.fromEntries(data.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      form.reset()
    } catch (err:any) {
      setStatus('error')
      setError('لم يتم الإرسال. جرّب مرة أخرى أو تواصل عبر واتساب.')
    }
  }

  const waHref = `https://wa.me/201060014684?text=${encodeURIComponent('مرحبًا، أريد الاستفسار/الطلب من B12 Cafe.')}`

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">{t('contact.title')}</h1>
        <p className="section-sub">{t('contact.sub')}</p>

        <div className="card contact-grid">
          {/* معلومات التواصل */}
          <div className="contact-info">
            <h3 style={{marginTop:0}}>تواصل مباشر</h3>
            <ul>
              <li>
                <FiPhone aria-hidden style={{marginInlineEnd:8}}/>
                <a href="tel:+201060014684">+20 106 001 4684</a>
              </li>
              <li>
                <SiWhatsapp aria-hidden style={{marginInlineEnd:8}}/>
                <a href={waHref} target="_blank" rel="noopener">WhatsApp</a>
              </li>
              <li>
                <FiMail aria-hidden style={{marginInlineEnd:8}}/>
                <a href="mailto:contact@b12cafe.eg">contact@b12cafe.eg</a>
              </li>
              <li>
                <FiMapPin aria-hidden style={{marginInlineEnd:8}}/>
                El-Galaa, Tanta, Gharbia, Egypt
              </li>
            </ul>

            <div className="map-embed" style={{marginTop:12}}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d685.2452207238615!2d31.011258398251798!3d30.780022745688022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c900514b8431%3A0xa7c73a5310313744!2sB12%20Cafe!5e0!3m2!1sen!2ssa!4v1758809786893!5m2!1sen!2ssa"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="B12 Cafe Map"
              />
            </div>

            <a className="btn ghost" href="https://maps.app.goo.gl/CKNmo3WZdpEAzPGJ8" target="_blank" rel="noopener" style={{marginTop:12}}>
              فتح في خرائط جوجل
            </a>
          </div>

          {/* فورم المراسلة */}
          <form className="contact-form" onSubmit={onSubmit}>
            {/* honeypot */}
            <input name="website" style={{display:'none'}} tabIndex={-1} autoComplete="off" />

            <div className="row">
              <input name="name" placeholder="الاسم" required />
              <input name="email" type="email" placeholder="الإيميل" required />
            </div>
            <input name="subject" placeholder="الموضوع" />
            <textarea name="message" rows={6} placeholder="رسالتك" required />

            <div className="actions">
              <button className="btn" type="submit" disabled={status==='loading'}>
                {status==='loading' ? 'جارٍ الإرسال…' : t('contact.send')}
              </button>
              <a className="btn ghost" href={waHref} target="_blank" rel="noopener">
                تواصل عبر واتساب
              </a>
            </div>

            {status==='success' && (
              <p style={{color:'green', marginTop:10}}>تم الإرسال بنجاح ✅</p>
            )}
            {status==='error' && (
              <p style={{color:'crimson', marginTop:10}}>{error}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}
