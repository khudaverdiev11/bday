import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio()
    audio.src = '/music/lovesong.mp3'
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setReady(true))
    audio.load()

    // Hide tooltip after 4s
    const t = setTimeout(() => setShowTooltip(false), 4000)
    return () => {
      clearTimeout(t)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const fadeVolume = (audio, from, to, duration = 1500) => {
    const steps = 40
    const interval = duration / steps
    const delta = (to - from) / steps
    let current = from
    const timer = setInterval(() => {
      current += delta
      audio.volume = Math.min(1, Math.max(0, current))
      if ((delta > 0 && current >= to) || (delta < 0 && current <= to)) {
        audio.volume = to
        clearInterval(timer)
        if (to === 0) audio.pause()
      }
    }, interval)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!playing) {
      try {
        audio.volume = 0
        await audio.play()
        fadeVolume(audio, 0, 0.35)
        setPlaying(true)
        setShowTooltip(false)
      } catch (e) {
        console.warn('Audio play failed:', e)
      }
    } else {
      fadeVolume(audio, audio.volume, 0)
      setPlaying(false)
    }
  }

  return (
    <div style={styles.wrap}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div style={styles.tooltip}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.4 }}>
            🎵 Play Adele – Love Song
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        style={{ ...styles.btn, ...(playing ? styles.btnPlaying : {}) }}
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        title={playing ? 'Pause music' : 'Play Adele – Love Song'}
      >
        {/* Vinyl record icon or music note */}
        <motion.span
          style={styles.icon}
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { repeat: Infinity, duration: 4, ease: 'linear' } : { duration: 0.3 }}
        >
          🎵
        </motion.span>

        {/* Ripple when playing */}
        {playing && (
          <>
            <motion.span style={styles.ripple}
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }} />
            <motion.span style={styles.ripple}
              animate={{ scale: [1, 2.4], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: 'easeOut' }} />
          </>
        )}
      </motion.button>

      {/* Floating music notes when playing */}
      <AnimatePresence>
        {playing && ['♪','♫','♩'].map((note, i) => (
          <motion.span key={i} style={{ ...styles.floatingNote, left: `${-10 + i * 14}px` }}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: -50, x: (i - 1) * 20 }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.7, ease: 'easeOut' }}>
            {note}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'fixed',
    bottom: '1.8rem',
    right: '1.8rem',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  tooltip: {
    background: 'rgba(14,4,8,0.92)',
    border: '1px solid rgba(155,45,66,0.35)',
    borderRadius: 99,
    padding: '0.45rem 1rem',
    fontSize: '0.72rem',
    color: '#e8b86d',
    letterSpacing: '0.08em',
    whiteSpace: 'nowrap',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
  },
  btn: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    background: 'rgba(14,4,8,0.9)',
    border: '1px solid rgba(155,45,66,0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(12px)',
    flexShrink: 0,
  },
  btnPlaying: {
    border: '1px solid rgba(200,99,122,0.6)',
    boxShadow: '0 0 20px rgba(107,26,42,0.6), 0 4px 20px rgba(0,0,0,0.5)',
  },
  icon: {
    fontSize: '1.3rem',
    display: 'block',
    position: 'relative',
    zIndex: 1,
  },
  ripple: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: '1px solid rgba(200,99,122,0.5)',
  },
  floatingNote: {
    position: 'absolute',
    bottom: '100%',
    fontSize: '1rem',
    color: '#c9924a',
    pointerEvents: 'none',
  },
}
