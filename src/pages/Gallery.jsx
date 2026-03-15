import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlowerCanvas from '../components/FlowerCanvas'
import PageTransition from '../components/PageTransition'
import { memories, valentines } from '../data/photos'

const SECTIONS = [
  { key: 'all',        label: 'All Memories' },
  { key: 'valentines', label: '💝 Valentine\'s' },
  { key: 'concert',    label: '🎵 Concert'     },
  { key: 'cinema',     label: '🎬 Cinema'      },
  { key: 'gaming',     label: '🎮 Gaming'      },
  { key: 'dates',      label: '🌙 Dates'       },
  { key: 'flowers',    label: '🌹 Flowers'     },
]

export default function Gallery() {
  const [tab, setTab] = useState('all')
  const [active, setActive] = useState(null)

  const allPhotos = [...memories, ...valentines.map(p => ({ ...p, section: 'valentines' }))]
  const filtered = tab === 'all' ? allPhotos : allPhotos.filter(p => p.section === tab)

  return (
    <PageTransition key="gallery">
      <FlowerCanvas count={20} />
      <div style={styles.page}>
        <motion.div style={{ textAlign: 'center', marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          <span className="label">Our Memories</span>
          <h2 className="display-title" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)' }}>
            Every chapter<br /><em>of us</em>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div style={styles.tabs}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {SECTIONS.map(s => (
            <button key={s.key} style={{ ...styles.tab, ...(tab === s.key ? styles.tabActive : {}) }}
              onClick={() => setTab(s.key)}>
              {s.label}
            </button>
          ))}
        </motion.div>

        <motion.div style={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <motion.div key={photo.file} style={styles.card}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(107,26,42,0.55), 0 0 25px rgba(180,60,80,0.15)' }}
                onClick={() => setActive(photo)}>
                <div style={styles.imgWrap}>
                  <img src={`/photos/${photo.file}`} alt={photo.caption} style={styles.img}
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                  <div style={{ ...styles.imgFallback, display: 'none' }}>
                    <span style={{ fontSize: '2.5rem' }}>📷</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '0.4rem', textAlign: 'center', padding: '0 0.5rem' }}>{photo.file}</span>
                  </div>
                  <div style={styles.overlay}>
                    <span style={styles.caption}>{photo.caption}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p style={styles.hint}>Place your photos in <code style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>public/photos/</code> using the filenames from <code style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>src/data/photos.js</code></p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div style={styles.lightbox}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}>
            <motion.div style={styles.lightboxInner}
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85 }}
              transition={{ duration: 0.3 }} onClick={e => e.stopPropagation()}>
              <img src={`/photos/${active.file}`} alt={active.caption} style={styles.lightboxImg} />
              <p style={styles.lightboxCaption}>{active.caption}</p>
              <p style={styles.lightboxNote}>{active.note}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'radial-gradient(ellipse at 50% 80%, #1e0812 0%, #0e0608 60%)', padding: '7rem 1.5rem 5rem' },
  tabs: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 700, margin: '0 auto 2rem' },
  tab: { background: 'rgba(16,4,9,0.8)', border: '1px solid rgba(155,45,66,0.2)', borderRadius: 99, padding: '0.38rem 0.85rem', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-dim)', cursor: 'pointer', transition: 'all 0.2s' },
  tabActive: { background: 'linear-gradient(135deg, var(--wine), var(--wine-light))', color: 'var(--gold-pale)', borderColor: 'var(--wine-light)', boxShadow: '0 0 16px rgba(107,26,42,0.5)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem', maxWidth: 950, margin: '0 auto' },
  card: { borderRadius: 18, overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(155,45,66,0.2)', boxShadow: '0 6px 24px rgba(0,0,0,0.5)' },
  imgWrap: { position: 'relative', aspectRatio: '4/5', background: '#100408' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  imgFallback: { position: 'absolute', inset: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#150508' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(6,1,4,0.85))', padding: '2rem 0.8rem 0.8rem', borderRadius: '0 0 18px 18px' },
  caption: { color: 'var(--gold-pale)', fontSize: '0.75rem', letterSpacing: '0.06em' },
  hint: { textAlign: 'center', marginTop: '2rem', fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.8 },
  lightbox: { position: 'fixed', inset: 0, background: 'rgba(4,0,2,0.93)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(16px)', padding: '2rem', cursor: 'zoom-out' },
  lightboxInner: { maxWidth: 480, width: '100%', background: 'rgba(14,3,8,0.97)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(155,45,66,0.4)', cursor: 'default' },
  lightboxImg: { width: '100%', maxHeight: '60vh', objectFit: 'cover', display: 'block' },
  lightboxCaption: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--gold-light)', padding: '1rem 1.2rem 0.3rem' },
  lightboxNote: { fontSize: '0.82rem', color: 'var(--text-dim)', padding: '0 1.2rem 1.2rem', lineHeight: 1.65, fontStyle: 'italic' },
}
