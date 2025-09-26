import { SiWhatsapp } from 'react-icons/si'

type Props = {
  /** رقم واتساب بصيغة E.164 بدون + */
  phone?: string
  /** رسالة جاهزة تُفتح في واتساب */
  message?: string
}

export default function FloatingWhatsApp({
  phone = '201060014684',
  message = 'مرحبًا، أريد الطلب من B12 Cafe.'
}: Props){
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="wa-float"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      <SiWhatsapp />
    </a>
  )
}
