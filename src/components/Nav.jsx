import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/',          label: '🌹 Home'       },
  { to: '/childhood', label: '🎞️ Childhood'  },
  { to: '/timeline',  label: '💛 Our Story'   },
  { to: '/gallery',   label: '📷 Memories'   },
  { to: '/letter',    label: '💌 Letter'      },
]

export default function Nav() {
  return (
    <motion.nav className="nav"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}>
      {links.map(({ to, label }) => (
        <NavLink key={to} to={to} end={to === '/'}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          {label}
        </NavLink>
      ))}
    </motion.nav>
  )
}
