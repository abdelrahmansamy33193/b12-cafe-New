import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop({ smooth = true }: { smooth?: boolean }) {
  const { pathname } = useLocation()

  useEffect(() => {
    // دايمًا اطلع فوق أول ما المسار يتغير
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }, [pathname, smooth])

  return null
}
