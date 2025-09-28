// src/pages/Events.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import manifest from '../data/events.manifest.json'
import EventCard, { MediaItem } from '../components/EventCard'

type Album = {
  title: string
  slug: string
  date?: string | null
  cover?: string | null
  media: MediaItem[]
}

export default function Events(){
  const { t } = useTranslation()
  const albums = (manifest as { albums?: Album[] }).albums ?? []

  return (
    <section className="section container">
      <h2 className="section-title">{t('events.title','Events')}</h2>
      <p className="section-sub">{t('events.sub','Photos & videos from our community.')}</p>

      <div className="events-grid" data-reveal>
        {albums.map(a => (
          <EventCard
            key={a.slug}
            title={a.title}
            date={a.date ?? undefined}
            media={a.media}
            cover={a.cover ?? undefined}
          />
        ))}
      </div>
    </section>
  )
}
