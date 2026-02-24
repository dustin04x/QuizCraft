import { Github, Linkedin, LogOut, Sparkles } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth.jsx'
import UserAvatar from './UserAvatar.jsx'

function AppLayout({ children }) {
  const navClassName = ({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`
  const { isAuthenticated, isAdmin, user, logout } = useAuth()

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
          {isAuthenticated && (
            <NavLink className={navClassName} to="/scoreboard">
              Scoreboard
            </NavLink>
          )}
          {isAdmin && (
            <NavLink className={navClassName} to="/admin">
              Admin
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink className={navClassName} to="/auth">
              Login
            </NavLink>
          )}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link className="user-pill" to="/profile">
                <UserAvatar size="xs" user={user} />
                {user?.name || 'User'}
              </Link>
              <button className="button button-soft" onClick={logout} type="button">
                <LogOut size={14} />
                Logout
              </button>
              <Link className="button button-primary" to="/play">
                Start Quiz
              </Link>
            </>
          ) : (
            <Link className="button button-primary" to="/auth">
              Login / Register
            </Link>
          )}
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
