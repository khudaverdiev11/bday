import { useMemo } from 'react'

const PETALS = ['🌹', '🥀', '❧', '✦', '✸', '⁕', '✾', '❋']

export default function FlowerCanvas({ count = 24 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
      left: Math.random() * 100,
      size: 0.7 + Math.random() * 1.1,
      duration: 9 + Math.random() * 12,
      delay: Math.random() * 16,
      opacity: 0.25 + Math.random() * 0.45,
      isGold: ['✦','✸','⁕'].includes(PETALS[Math.floor(Math.random() * PETALS.length)]),
    }))
  }, [count])

  return (
    <div className="flower-canvas">
      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            filter: 'drop-shadow(0 0 6px rgba(200,99,122,0.35))',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
