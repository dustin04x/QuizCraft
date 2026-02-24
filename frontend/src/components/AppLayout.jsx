import { Github, Linkedin, Sparkles } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

function AppLayout({ children }) {
  const navClassName = ({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`

  return (
    <div className="app-shell">
      <div className="noise" aria-hidden />
      <header className="top-nav">
        <Link className="brand-mark" to="/">
          <Sparkles size={16} />
          <span>QuizCraft</span>
        </Link>

        <nav className="nav-cluster">
          <NavLink className={navClassName} to="/">
            Home
          </NavLink>
          <NavLink className={navClassName} to="/play">
            Play
          </NavLink>
        </nav>

        <div className="nav-actions">
          <Link className="button button-primary" to="/play">
            Start Quiz
          </Link>
        </div>
      </header>

      <main className="page-wrap">{children}</main>

      <footer className="site-footer glass-panel">
        <p className="site-footer-copy">Built by Skander Wali</p>
        <div className="site-footer-links">
          <a
            className="site-link"
            href="https://www.linkedin.com/in/skander-wali-901040391/"
            rel="noreferrer"
            target="_blank"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            className="site-link"
            href="https://github.com/dustin04x"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout
