import { motion as Motion } from 'framer-motion'

function PageTransition({ children }) {
  return (
    <Motion.div
      animate={{ opacity: 1, y: 0 }}
      className="page-transition"
      exit={{ opacity: 0, y: -16 }}
      initial={{ opacity: 0, y: 22 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Motion.div>
  )
}

export default PageTransition
