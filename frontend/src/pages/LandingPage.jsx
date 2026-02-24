import { motion as Motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Clock4, Layers2, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TOPICS, TOTAL_QUESTIONS } from '../data/questionBank.js'

const features = [
  {
    title: 'IT + Cyber Only',
    text: 'Questions focused on computer science, networking, and cybersecurity.',
    icon: BrainCircuit,
  },
  {
    title: `${TOTAL_QUESTIONS}+ Questions`,
    text: 'Large technical question bank for university-level training.',
    icon: Layers2,
  },
  {
    title: '4 Quiz Modes',
    text: 'Classic, Timed Sprint, Exam Mode, and Review Mistakes with local progress tracking.',
    icon: Target,
  },
  {
    title: 'Fast Quiz Flow',
    text: 'Clean interface with smooth transitions and explanatory feedback.',
    icon: Clock4,
  },
]

function LandingPage() {
  return (
    <div className="landing-stack">
      <section className="hero-grid glass-panel">
        <Motion.div
          animate={{ opacity: 1, y: 0 }}
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.5 }}
        >
          <span className="kicker">
            <Sparkles size={14} />
            Computer Science Quiz Arena
          </span>
          <h1 className="hero-title">Train on IT and cybersecurity with randomized quizzes.</h1>
          <p className="hero-subtitle">
            Built for computer science students: pick a technical category, answer random questions,
            and improve your cybersecurity and IT fundamentals.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/play">
              Start Playing
              <ArrowRight size={16} />
            </Link>
            <Link className="button button-soft" to="/play">Quick Match</Link>
          </div>
        </Motion.div>

        <Motion.div
          animate={{ opacity: 1, y: 0 }}
          className="floating-grid"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="floating-card">
            <p className="floating-label">Question bank</p>
            <p className="floating-value">{TOTAL_QUESTIONS}+ Questions</p>
          </div>
          <div className="floating-card">
            <p className="floating-label">Categories</p>
            <p className="floating-value">{TOPICS.length} IT Topics</p>
          </div>
          <div className="floating-card">
            <p className="floating-label">Mode</p>
            <p className="floating-value">Classic / Timed / Exam / Review</p>
          </div>
        </Motion.div>
      </section>

      <section className="feature-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Motion.article
              animate={{ opacity: 1, y: 0 }}
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 28 }}
              key={feature.title}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Icon size={20} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </Motion.article>
          )
        })}
      </section>
    </div>
  )
}

export default LandingPage
