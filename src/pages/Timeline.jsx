import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FlowerCanvas from '../components/FlowerCanvas'
import PageTransition from '../components/PageTransition'

const events = [
  { emoji: '👀', date: '2016', title: 'First Encounter', desc: 'Two people crossed paths — years before the universe was ready for them to fall in love.' },
  { emoji: '🌿', date: 'August 2025', title: 'The Park Date', desc: 'Nine years later, you finally met again in the park near her neighborhood. Hours of talking, laughing, and something quietly shifting between you.' },
  { emoji: '📞', date: 'Aug – Sep 2025', title: 'Every Day, Every Call', desc: 'You talked every single day. Long calls, late nights, endless conversations that made the hours vanish.' },
  { emoji: '🌊', date: 'Late Sep 2025', title: 'The Storm You Crossed', desc: 'A moment that could have ended everything. You chose to stay. That choice made everything more real.' },
  { emoji: '💋', date: 'End of Sep 2025', title: 'Official & First Kiss', desc: 'You made it official. And then — your first kiss. Everything before was just the beginning.' },
  { emoji: '🥂', date: 'Oct 2025 · Qabala', title: 'Drunk Calls from Qabala', desc: 'A friend\'s wedding. Every night a little drunk, calling her for 2–3 hours. Romantic, funny, unforgettable. She missed you when you came back.' },
  { emoji: '🎬', date: 'Autumn 2025', title: 'Cinema Dates', desc: 'Popcorn, dark rooms, her laughing at the screen. Every cinema trip a favourite memory.' },
  { emoji: '🎮', date: 'Winter 2025', title: 'It Takes Two', desc: 'Playing It Takes Two on Discord together. Fighting through puzzles, laughing through failures — the perfect metaphor for you two.' },
  { emoji: '🎵', date: 'Winter 2025', title: 'Poizi Concert', desc: 'Stage lights, music, and her beside you. One of those nights you\'ll remember forever.' },
  { emoji: '💝', date: 'Feb 14, 2026', title: 'Valentine\'s Night', desc: 'She dressed up in full glam, red lips, jewels. You took her to dinner. The most romantic night of your life so far.' },
  { emoji: '🌹', date: 'Every Month', title: 'Flowers, Without Fail', desc: 'Every single month — flowers, a note, a reminder: I see you. I choose you. Always.' },
  { emoji: '🎂', date: 'March 16, 2026', title: 'Happy Birthday, Saadet', desc: 'Here we are. Seven months in, still choosing each other every single day. This is only the beginning.' },
]

function TLItem({ event, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isRight = index % 2 === 0

  return (
    <div ref={ref} style={styles.row}>
      <motion.div style={{ ...styles.side, alignItems: isRight ? 'flex-end' : 'flex-start' }}
        initial={{ opacity: 0, x: isRight ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
        {isRight && (
          <div style={styles.card}>
            <span style={styles.cardEmoji}>{event.emoji}</span>
            <p style={styles.cardDate}>{event.date}</p>
            <h3 style={styles.cardTitle}>{event.title}</h3>
            <p style={styles.cardDesc}>{event.desc}</p>
          </div>
        )}
      </motion.div>

      <div style={styles.dotCol}>
        <motion.div style={styles.dot}
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }} />
      </div>

      <motion.div style={{ ...styles.side, alignItems: isRight ? 'flex-start' : 'flex-end' }}
        initial={{ opacity: 0, x: isRight ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
        {!isRight && (
          <div style={styles.card}>
            <span style={styles.cardEmoji}>{event.emoji}</span>
            <p style={styles.cardDate}>{event.date}</p>
            <h3 style={styles.cardTitle}>{event.title}</h3>
            <p style={styles.cardDesc}>{event.desc}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function Timeline() {
  return (
    <PageTransition key="timeline">
      <FlowerCanvas count={18} />
      <div style={styles.page}>
        <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          <span className="label">Our Story</span>
          <h2 className="display-title" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)' }}>
            Every moment<br /><em>that led us here</em>
          </h2>
        </motion.div>

        <div style={styles.timeline}>
          <div style={styles.line} />
          {events.map((e, i) => <TLItem key={i} event={e} index={i} />)}
        </div>
      </div>
    </PageTransition>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'radial-gradient(ellipse at 70% 30%, #1a0810 0%, #0e0608 65%)', paddingTop: '7rem', paddingBottom: '5rem' },
  timeline: { maxWidth: 760, margin: '0 auto', padding: '0 1rem', position: 'relative' },
  line: { position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, #6b1a2a, #9b2d42, #6b1a2a, transparent)', transform: 'translateX(-50%)', pointerEvents: 'none' },
  row: { display: 'flex', alignItems: 'flex-start', marginBottom: '2.2rem', position: 'relative' },
  side: { flex: 1, display: 'flex', flexDirection: 'column', padding: '0 1.3rem' },
  dotCol: { width: 22, display: 'flex', justifyContent: 'center', paddingTop: '0.5rem', flexShrink: 0 },
  dot: { width: 13, height: 13, borderRadius: '50%', background: 'var(--rose)', border: '3px solid #0e0608', boxShadow: '0 0 10px rgba(200,99,122,0.6)', flexShrink: 0 },
  card: { background: 'rgba(16,4,9,0.9)', borderRadius: 16, padding: '1rem 1.2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.5)', border: '1px solid rgba(155,45,66,0.2)', maxWidth: 295, backdropFilter: 'blur(8px)' },
  cardEmoji: { fontSize: '1.4rem', display: 'block', marginBottom: '0.3rem' },
  cardDate: { fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.25rem' },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--rose-soft)', marginBottom: '0.35rem' },
  cardDesc: { fontSize: '0.8rem', lineHeight: 1.65, color: 'var(--text-dim)' },
}
