// src/components/EventCard.tsx
import React from 'react'
import { createPortal } from 'react-dom'
import {
  LuImages, LuX, LuChevronLeft, LuChevronRight,
  LuZoomIn, LuZoomOut, LuRotateCcw, LuPlay
} from 'react-icons/lu'

export type MediaItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }

type Props = {
  title: string
  date?: string | null
  media: MediaItem[]
  cover?: string | null
}

const fallbackImg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ddd"/><stop offset="1" stop-color="#cfcfcf"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`)

const MAX_SCALE = 3
const MIN_SCALE = 1
const SWIPE_THRESHOLD = 60
const DOUBLE_TAP_MS = 300

const isVideoFile = (p: string) => /\.(mp4|webm|ogg|ogv)(\?.*)?$/i.test(p)
const enc = (p?: string) => (p ? encodeURI(p) : '')

function useSmartSrc(candidates: string[]) {
  const [i, setI] = React.useState(0)
  const src = candidates[i]
  const onError = () => { if (i + 1 < candidates.length) setI(i + 1) }
  return { src, onError }
}

export default function EventCard({ title, date, media, cover }: Props){
  const mixed = media ?? []
  const hasVideo = mixed.some(m => m.type === 'video')

  // اختيارات صورة البلاطة (الغلاف) بالترتيب
  const tileCandidates = React.useMemo(() => {
    const list: string[] = []

    if (cover && !isVideoFile(cover)) list.push(cover)
    const firstImg = mixed.find(m => m.type === 'image') as any
    if (firstImg?.src) list.push(firstImg.src)

    const firstVid = mixed.find(m => m.type === 'video') as any
    if (firstVid?.poster) list.push(firstVid.poster)
    if (firstVid?.src) {
      const base = firstVid.src.replace(/\.(mp4|webm|ogg|ogv)(\?.*)?$/i, '')
      list.push(
        `${base}.jpg`, `${base}.jpeg`,
        `${base}.png`, `${base}.webp`,
        `${base}.poster.jpg`, `${base}-poster.jpg`
      )
    }

    list.push(fallbackImg)
    return list.map(enc)
  }, [cover, mixed])

  const { src: tileSrc, onError: tileErr } = useSmartSrc(tileCandidates)

  // Lightbox state
  const [open, setOpen] = React.useState(false)
  const [idx, setIdx] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)

  const [dx, setDx] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [pan, setPan] = React.useState({ x: 0, y: 0 })

  const pointers = React.useRef<Map<number, {x:number,y:number}>>(new Map())
  const pinchRef = React.useRef({ startDist: 0, startScale: 1, lastX: 0, lastY: 0 })
  const cacheRef = React.useRef<Record<string, HTMLImageElement>>({})
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const lastTapRef = React.useRef<number>(0)

  React.useEffect(() => setMounted(true), [])

  const isImage = (m: MediaItem) => m.type === 'image'
  const clamp = (v:number, min:number, max:number) => Math.min(max, Math.max(min, v))

  const clampPan = (nx:number, ny:number) => {
    const cont = containerRef.current
    const imgEl = imgRef.current
    if (!cont || !imgEl) return { x: nx, y: ny }
    const contRect = cont.getBoundingClientRect()
    const imgRect = imgEl.getBoundingClientRect()
    const maxX = Math.max((imgRect.width - contRect.width) / 2, 0)
    const maxY = Math.max((imgRect.height - contRect.height) / 2, 0)
    return { x: clamp(nx, -maxX, maxX), y: clamp(ny, -maxY, maxY) }
  }

  const preload = (src?: string) => {
    if (!src || cacheRef.current[src]) return
    const img = new Image()
    ;(img as any).decoding = 'async'
    img.src = enc(src)
    img.onload = () => { cacheRef.current[src] = img }
  }

  const openLightbox = (start = 0) => {
    setIdx(start); setOpen(true)
    setScale(1); setPan({x:0,y:0}); setDx(0)
  }
  const closeLightbox = () => { videoRef.current?.pause(); setOpen(false) }

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation(); setLoaded(false)
    setScale(1); setPan({x:0,y:0}); setDx(0)
    setIdx(i => (i - 1 + mixed.length) % mixed.length)
  }
  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation(); setLoaded(false)
    setScale(1); setPan({x:0,y:0}); setDx(0)
    setIdx(i => (i + 1) % mixed.length)
  }

  React.useEffect(() => {
    if (!open) return
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (scale === 1 && e.key === 'ArrowRight') next()
      else if (scale === 1 && e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, scale])

  React.useEffect(() => {
    if (!open || mixed.length < 2) return
    const p = (idx - 1 + mixed.length) % mixed.length
    const n = (idx + 1) % mixed.length
    const prevItem = mixed[p]
    const nextItem = mixed[n]
    if (isImage(prevItem)) preload((prevItem as any).src)
    if (isImage(nextItem)) preload((nextItem as any).src)
  }, [open, idx, mixed])

  const onPointerDown = (e: React.PointerEvent) => {
    const now = Date.now()
    const curr = mixed[idx]
    if (isImage(curr) && (now - lastTapRef.current < DOUBLE_TAP_MS)) {
      e.preventDefault()
      const newScale = scale > 1 ? 1 : 2
      setScale(newScale); setPan({x:0, y:0}); lastTapRef.current = 0
      return
    }
    lastTapRef.current = now
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && isImage(curr)) {
      const arr = Array.from(pointers.current.values())
      const dx = arr[0].x - arr[1].x
      const dy = arr[0].y - arr[1].y
      pinchRef.current.startDist = Math.hypot(dx, dy)
      pinchRef.current.startScale = scale
    } else if (scale === 1) {
      setDragging(true); setDx(0)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    const curr = mixed[idx]
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && isImage(curr)) {
      e.preventDefault()
      const arr = Array.from(pointers.current.values())
      const dx2 = arr[0].x - arr[1].x
      const dy2 = arr[0].y - arr[1].y
      const dist = Math.hypot(dx2, dy2)
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchRef.current.startScale * (dist / (pinchRef.current.startDist || 1))))
      setScale(nextScale)
      setPan(p => clampPan(p.x, p.y))
      return
    }

    const moveX = e.clientX - (pinchRef.current.lastX || e.clientX)
    const moveY = e.clientY - (pinchRef.current.lastY || e.clientY)
    pinchRef.current.lastX = e.clientX
    pinchRef.current.lastY = e.clientY

    if (isImage(curr) && scale > 1) {
      e.preventDefault()
      setPan(p => clampPan(p.x + moveX, p.y + moveY))
    } else {
      if (Math.abs(moveX) > 0) { e.preventDefault(); setDx(prev => prev + moveX) }
    }
  }

  const finishSwipe = () => {
    if (!dragging) return
    if (dx <= -SWIPE_THRESHOLD) next()
    else if (dx >= SWIPE_THRESHOLD) prev()
    setDx(0); setDragging(false)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size === 0) finishSwipe()
  }

  const onWheel = (e: React.WheelEvent) => {
    const curr = mixed[idx]
    if (!open || !isImage(curr)) return
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    const ns = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta))
    setScale(ns)
    if (ns === 1) setPan({x:0,y:0})
  }

  const zoomIn  = () => setScale(s => Math.min(MAX_SCALE, s + 0.5))
  const zoomOut = () => setScale(s => {
    const ns = Math.max(MIN_SCALE, s - 0.5)
    if (ns === 1) setPan({x:0,y:0})
    return ns
  })
  const zoomReset = () => { setScale(1); setPan({x:0,y:0}) }

  const curr = mixed[idx]
  // اختَر أول فيديو لو موجود، وإلا ارجع لأول عنصر
const firstVideoIndex = React.useMemo(
  () => mixed.findIndex(m => m.type === 'video'),
  [mixed]
);
const defaultStart = firstVideoIndex >= 0 ? firstVideoIndex : 0;


  return (
    <article className="event-card ig" aria-label={title}>
      <div
        className="event-cover ig-tile"
  onClick={() => openLightbox(defaultStart)}
  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(defaultStart)}
  role="button"
  tabIndex={0}
      >
        <img
          src={tileSrc}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={tileErr}
          draggable={false}
          style={{ inset: 0, position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {hasVideo && <span className="ig-play" aria-hidden><LuPlay/></span>}

        {mixed.length > 1 && (
          <span className="ig-multi" title={`${mixed.length} media`}>
            <LuImages aria-hidden />
          </span>
        )}

        <div className="ig-overlay">
          <div className="ig-caption">
           
            {date && <span className="ig-date">{date}</span>}
          </div>
        </div>
      </div>

      {open && mounted && createPortal(
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close"><LuX /></button>
          {mixed.length > 1 && scale === 1 && (
            <button className="lightbox-nav prev" onClick={prev} aria-label="Previous"><LuChevronLeft /></button>
          )}

          {curr?.type === 'image' && (
            <div className="lb-zoom-controls" onClick={(e)=>e.stopPropagation()}>
              <button className="lb-zoom-btn" onClick={zoomOut} aria-label="Zoom out"><LuZoomOut/></button>
              <button className="lb-zoom-btn" onClick={zoomIn} aria-label="Zoom in"><LuZoomIn/></button>
              <button className="lb-zoom-btn" onClick={zoomReset} aria-label="Reset zoom"><LuRotateCcw/></button>
            </div>
          )}

          <div
            className={`lightbox-inner ${dragging ? 'dragging' : ''}`}
            ref={containerRef}
            onClick={(e)=>e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
          >
            <div
              className={`lb-track ${dragging && scale===1 ? 'dragging' : ''}`}
              style={{ transform: scale === 1 ? `translate3d(${dx}px,0,0)` : 'none' }}
            >
              {curr?.type === 'image' ? (
                <img
                  ref={imgRef}
                  key={`img-${idx}`}
                  className={`lb-img ${loaded ? 'is-loaded' : ''}`}
                  src={enc((curr as any).src)}
                  alt={`${title} ${idx+1}`}
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                  onLoad={() => setLoaded(true)}
                  onError={(e)=>((e.target as HTMLImageElement).src = fallbackImg)}
                  draggable={false}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
                    transformOrigin: 'center center'
                  }}
                />
              ) : (
                <video
                  ref={videoRef}
                  key={`vid-${idx}`}
                  className="lb-video"
                  controls
                  playsInline
                  preload="metadata"
                  poster={enc((curr as any).poster || '') || undefined}
                  onPlay={() => setLoaded(true)}
                  onLoadedData={() => setLoaded(true)}
                  onClick={(e)=>e.stopPropagation()}
                >
                  <source src={enc((curr as any).src)} />
                </video>
              )}
            </div>
          </div>

          {mixed.length > 1 && scale === 1 && (
            <button className="lightbox-nav next" onClick={next} aria-label="Next"><LuChevronRight /></button>
          )}
        </div>,
        document.body
      )}
    </article>
  )
}
