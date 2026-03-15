import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlowerCanvas from '../components/FlowerCanvas'
import PageTransition from '../components/PageTransition'
import { childhood } from '../data/photos'

export default function Childhood() {
  const [active, setActive] = useState(null)

  return (
    <PageTransition key="childhood">
      <FlowerCanvas count={20} />
      <div style={styles.page}>
        <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          <span className="label">Before We Knew</span>
          <h2 className="display-title" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)' }}>
            Her childhood<br /><em>the girl she was</em>
          </h2>
          <p style={styles.sub}>Long before August 2025 — she was already something special.</p>
        </motion.div>

        <div style={styles.grid}>
          {childhood.map((photo, i) => (
            <motion.div key={i} style={styles.card}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(107,26,42,0.5), 0 0 30px rgba(180,60,80,0.15)' }}
              onClick={() => setActive(photo)}>
              <div style={styles.imgWrap}>
                <img
                  src={`/photos/${photo.file}`}
                  alt={photo.caption}
                  style={styles.img}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                />
                <div style={{ ...styles.imgFallback, display: 'none' }}>
                  <span style={{ fontSize: '3rem' }}>🎞️</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>Add photo: {photo.file}</span>
                </div>
                <div style={styles.shimmer} />
              </div>
              <div style={styles.cardBody}>
                <p style={styles.caption}>{photo.caption}</p>
                <p style={styles.note}>{photo.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div style={styles.lightbox}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}>
            <motion.div style={styles.lightboxInner}
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              transition={{ duration: 0.35 }}
              onClick={e => e.stopPropagation()}>
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
  page: { minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 20%, #1e0812 0%, #0e0608 70%)', padding: '7rem 1.5rem 5rem' },
  sub: { fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.8rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem', maxWidth: 900, margin: '0 auto' },
  card: {
    background: 'rgba(18,5,10,0.9)', border: '1px solid rgba(155,45,66,0.25)',
    borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
  },
  imgWrap: { position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: '#1a0810' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'sepia(20%) contrast(1.05)' },
  imgFallback: { position: 'absolute', inset: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1a0810' },
  shimmer: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)', pointerEvents: 'none' },
  cardBody: { padding: '1rem 1.1rem 1.2rem' },
  caption: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '0.3rem' },
  note: { fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.6 },
  lightbox: { position: 'fixed', inset: 0, background: 'rgba(4,0,2,0.93)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(16px)', padding: '2rem', cursor: 'zoom-out' },
  lightboxInner: { maxWidth: 500, width: '100%', background: 'rgba(18,5,10,0.95)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(155,45,66,0.4)', cursor: 'default' },
  lightboxImg: { width: '100%', maxHeight: '65vh', objectFit: 'cover', display: 'block', filter: 'sepia(15%) contrast(1.05)' },
  lightboxCaption: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--gold-light)', padding: '1rem 1.2rem 0.3rem' },
  lightboxNote: { fontSize: '0.83rem', color: 'var(--text-dim)', padding: '0 1.2rem 1.2rem', lineHeight: 1.65 },
}
