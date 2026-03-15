import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  initial: { opacity: 0, scale: 0.96, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.02, y: -20 },
}

export default function PageTransition({ children, key }) {
  return (
    <motion.div
      key={key}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      {children}
    </motion.div>
  )
}
