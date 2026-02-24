import { motion as Motion } from 'framer-motion'
import { LogIn, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.jsx'

const INITIAL_FIELDS = {
  name: '',
  email: '',
  password: '',
}

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [error, setError] = useState('')
  const { login, register, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/play'

  const isRegisterMode = mode === 'register'

  const updateField = (key, value) => {
    setFields((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      if (isRegisterMode) {
        await register({
          name: fields.name,
          email: fields.email,
          password: fields.password,
        })
      } else {
        await login({
          email: fields.email,
          password: fields.password,
        })
      }

      navigate(redirectTo, { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Authentication failed.')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectTo])

  return (
    <div className="auth-page-wrap">
      <Motion.section
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel auth-card"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35 }}
      >
        <div className="auth-card-head">
          <p className="kicker">Account Access</p>
          <h1>{isRegisterMode ? 'Create an account' : 'Welcome back'}</h1>
          <p className="muted-text">
            {isRegisterMode
              ? 'Register to keep your quiz sessions separated by user.'
              : 'Sign in to continue your quiz journey.'}
          </p>
        </div>

        <div className="auth-switch">
          <button
            className={`auth-switch-btn ${!isRegisterMode ? 'active' : ''}`}
            onClick={() => switchMode('login')}
            type="button"
          >
            <LogIn size={14} />
            Login
          </button>
          <button
            className={`auth-switch-btn ${isRegisterMode ? 'active' : ''}`}
            onClick={() => switchMode('register')}
            type="button"
          >
            <UserPlus size={14} />
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegisterMode && (
            <label className="auth-field">
              <span>Name</span>
              <input
                autoComplete="name"
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Your name"
                required
                type="text"
                value={fields.name}
              />
            </label>
          )}

          <label className="auth-field">
            <span>Email</span>
            <input
              autoComplete="email"
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={fields.email}
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
              minLength={6}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="At least 6 characters"
              required
              type="password"
              value={fields.password}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="button button-primary" disabled={isLoading} type="submit">
            {isLoading
              ? 'Please wait...'
              : isRegisterMode
                ? 'Create account'
                : 'Login'}
          </button>
        </form>

        <p className="auth-footnote">
          Want to go back first? <Link to="/">Return home</Link>
        </p>
      </Motion.section>
    </div>
  )
}

export default AuthPage
