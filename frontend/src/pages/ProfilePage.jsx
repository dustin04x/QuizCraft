import { motion as Motion } from 'framer-motion'
import { UserRoundCog } from 'lucide-react'
import { useState } from 'react'
import UserAvatar from '../components/UserAvatar.jsx'
import { useAuth } from '../context/useAuth.jsx'
import Dashboard from './Dashboard.jsx'

function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const avatarUrl = String(formData.get('avatarUrl') ?? '')

    try {
      setMessage('')
      setIsError(false)
      await updateProfile({ name, avatarUrl })
      setMessage('Profile updated successfully.')
    } catch (error) {
      setIsError(true)
      setMessage(error.message || 'Could not update profile.')
    }
  }

  return (
    <div className="quiz-stack">
      <Motion.section
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel quiz-header"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35 }}
      >
        <div className="battle-header">
          <div>
            <p className="kicker">Profile</p>
            <h1>Your Profile</h1>
            <p className="muted-text">
              Update your display name and profile picture used across the app.
            </p>
          </div>
          <div className="battle-hud">
            <span className="hud-chip">
              <UserRoundCog size={14} />
              Account settings
            </span>
          </div>
        </div>
      </Motion.section>

      <section className="glass-panel profile-editor-card">
        <div className="profile-preview">
          <UserAvatar size="md" user={user} />
          <div>
            <p className="count-title">Current profile</p>
            <p className="muted-text">{user?.name}</p>
            <p className="muted-text">{user?.email}</p>
          </div>
        </div>

        <form className="profile-editor-form" key={user?.id} onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Display name</span>
            <input defaultValue={user?.name ?? ''} name="name" required type="text" />
          </label>
          <label className="auth-field">
            <span>Avatar image URL (http/https)</span>
            <input
              defaultValue={user?.avatarUrl ?? ''}
              name="avatarUrl"
              placeholder="https://example.com/avatar.png"
              type="url"
            />
          </label>
          <div className="profile-editor-actions">
            <button className="button button-primary" disabled={isLoading} type="submit">
              {isLoading ? 'Saving...' : 'Save profile'}
            </button>
          </div>
          <p className="muted-text">Leave avatar URL empty to use the default icon.</p>
        </form>

        {message && <p className={isError ? 'auth-error' : 'muted-text'}>{message}</p>}
      </section>

      <Dashboard />
    </div>
  )
}

export default ProfilePage
