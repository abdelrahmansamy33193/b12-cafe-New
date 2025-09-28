// scripts/generate-events-manifest.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const EVENTS_DIR = path.join(ROOT, 'public', 'assets', 'events')
const OUT = path.join(ROOT, 'src', 'data', 'events.manifest.json')

const IMG_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif']
const VID_EXTS = ['.mp4', '.webm', '.ogg', '.ogv'] // يكفي MP4 عملياً

const isImg = f => IMG_EXTS.includes(path.extname(f).toLowerCase())
const isVid = f => VID_EXTS.includes(path.extname(f).toLowerCase())

const webPath = p => '/' + p.replace(/\\/g, '/').split('/public/')[1]

async function listDirSafe(dir) {
  try { return await fs.readdir(dir, { withFileTypes: true }) }
  catch { return [] }
}

async function main() {
  const albumsDirs = (await listDirSafe(EVENTS_DIR)).filter(d => d.isDirectory())
  const albums = []

  for (const d of albumsDirs) {
    const albumName = d.name
    const abs = path.join(EVENTS_DIR, albumName)
    const entries = await listDirSafe(abs)

    const files = entries.filter(e => e.isFile()).map(e => e.name)
    const imgs = files.filter(isImg).sort()
    const vids = files.filter(isVid).sort()

    // media[]
    const media = [
      ...imgs.map(f => ({ type: 'image', src: webPath(path.join(abs, f)) })),
      ...vids.map(f => {
        const base = path.join(abs, f).replace(path.extname(f), '')
        const posterCandidate = [
          `${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`
        ].find(p => files.includes(path.basename(p)))
        return {
          type: 'video',
          src: webPath(path.join(abs, f)),
          ...(posterCandidate ? { poster: webPath(posterCandidate) } : {})
        }
      })
    ]

    if (!media.length) continue

    // cover: أول صورة إن وُجدت، وإلا بوستر أول فيديو
    const cover =
      (imgs[0] ? webPath(path.join(abs, imgs[0])) : null) ||
      (vids[0] ? (() => {
        const f = vids[0]
        const base = path.join(abs, f).replace(path.extname(f), '')
        const posterCandidate = [`${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`]
          .find(p => files.includes(path.basename(p)))
        return posterCandidate ? webPath(posterCandidate) : null
      })() : null)

    albums.push({
      title: albumName,
      slug: albumName,
      date: null,
      cover,
      media
    })
  }

  // فرز بسيط بالأسم (لو أسمائها أرقام هتطلع مظبوطة)
  albums.sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }))

  const payload = { albums }
  await fs.mkdir(path.dirname(OUT), { recursive: true })
  await fs.writeFile(OUT, JSON.stringify(payload, null, 2), 'utf8')

  const totalImgs = albums.reduce((n, a) => n + a.media.filter(m => m.type === 'image').length, 0)
  const totalVids = albums.reduce((n, a) => n + a.media.filter(m => m.type === 'video').length, 0)
  console.log(`✅ Wrote ${OUT}`)
  console.log(`   Albums: ${albums.length} | images: ${totalImgs} | videos: ${totalVids}`)
}

main().catch(err => { console.error(err); process.exit(1) })
