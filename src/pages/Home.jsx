import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FlowerCanvas from '../components/FlowerCanvas'
import PageTransition from '../components/PageTransition'

const cards = [
  { to: '/childhood',  emoji: '🎞️', title: 'Childhood',    sub: 'Before we even knew'       },
  { to: '/timeline',   emoji: '🌹', title: 'Our Story',    sub: 'Every moment that led here' },
  { to: '/gallery',    emoji: '📷', title: 'Memories',     sub: 'Us, in every chapter'       },
  { to: '/letter',     emoji: '💌', title: 'Love Letter',  sub: 'Words from my heart'        },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageTransition key="home">
      <FlowerCanvas count={30} />
      <div style={styles.hero}>
        <div style={styles.blob1} />
        <div style={styles.blob2} />
        <div style={styles.blob3} />

        {/* Glowing rose */}
        <motion.div
          style={styles.bigEmoji}
          animate={{ y: [0, -14, 0], filter: ['drop-shadow(0 0 20px rgba(180,40,60,0.6))', 'drop-shadow(0 0 40px rgba(180,40,60,0.9))', 'drop-shadow(0 0 20px rgba(180,40,60,0.6))'] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        >
          🌹
        </motion.div>

        <motion.p style={styles.subtitle}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}>
          with all my heart, for you
        </motion.p>

        <motion.h1 style={styles.title}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}>
          Happy
          <span style={styles.titleSub}>Birthday</span>
          <span style={styles.titleName}>Saadet</span>
        </motion.h1>

        <motion.div style={styles.dateLine}
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}>
          <span style={styles.dateInner}>March 16 · 2026</span>
        </motion.div>

        <motion.div style={styles.cardRow}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}>
          {cards.map((c, i) => (
            <motion.button key={c.to} style={styles.navCard}
              onClick={() => navigate(c.to)}
              whileHover={{ scale: 1.06, y: -8, boxShadow: '0 20px 50px rgba(107,26,42,0.6), 0 0 30px rgba(180,60,80,0.2)' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}>
              <span style={styles.cardEmoji}>{c.emoji}</span>
              <span style={styles.cardTitle}>{c.title}</span>
              <span style={styles.cardSub}>{c.sub}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '6rem 1.5rem 3rem',
    background: 'radial-gradient(ellipse at 50% 0%, #2a0912 0%, #0e0608 60%)',
    position: 'relative', overflow: 'hidden', textAlign: 'center',
  },
  blob1: { position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,26,42,0.25) 0%, transparent 70%)', top: '-15%', left: '-15%', pointerEvents: 'none' },
  blob2: { position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,146,74,0.1) 0%, transparent 70%)', bottom: '0%', right: '-10%', pointerEvents: 'none' },
  blob3: { position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,45,66,0.2) 0%, transparent 70%)', top: '40%', right: '10%', pointerEvents: 'none' },
  bigEmoji: { fontSize: '4.5rem', marginBottom: '1.4rem', display: 'block' },
  subtitle: {
    fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#c9924a',
    letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.8rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
    fontSize: 'clamp(3.2rem, 11vw, 7.5rem)', lineHeight: 0.9,
    color: '#f0dde2', display: 'flex', flexDirection: 'column', gap: 0,
  },
  titleSub: { fontStyle: 'italic', color: '#c8637a' },
  titleName: { fontWeight: 600, color: '#e8b86d', letterSpacing: '0.02em' },
  dateLine: {
    marginTop: '2rem', marginBottom: '3rem',
    borderTop: '1px solid rgba(201,146,74,0.3)', borderBottom: '1px solid rgba(201,146,74,0.3)',
    padding: '0.5rem 2rem',
  },
  dateInner: { fontSize: '0.72rem', letterSpacing: '0.4em', color: '#c9924a', textTransform: 'uppercase' },
  cardRow: { display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 800, width: '100%' },
  navCard: {
    background: 'rgba(20,6,12,0.8)', backdropFilter: 'blur(12px)',
    border: '1px solid rgba(155,45,66,0.35)', borderRadius: 18,
    padding: '1.4rem 1.5rem', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
    width: 175, transition: 'all 0.25s',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  },
  cardEmoji: { fontSize: '1.8rem' },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: '#e8b86d' },
  cardSub: { fontSize: '0.7rem', color: '#a07080', lineHeight: 1.4, textAlign: 'center' },
}
