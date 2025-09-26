import { useEffect } from 'react'

export default function useReveal(){
  useEffect(()=>{
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if(!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('reveal-in'))
      return
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          (e.target as HTMLElement).classList.add('reveal-in')
          io.unobserve(e.target)
        }
      })
    },{ threshold: .15 })
    els.forEach(el=>{
      el.classList.add('reveal')
      io.observe(el)
    })
    return ()=> io.disconnect()
  },[])
}
