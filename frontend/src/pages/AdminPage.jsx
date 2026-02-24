import { motion as Motion } from 'framer-motion'
import { ShieldCheck, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import UserAvatar from '../components/UserAvatar.jsx'
import { useAuth } from '../context/useAuth.jsx'
import { fetchAdminOverview, fetchAdminUserAttempts, fetchAdminUsers } from '../data/quizApi.js'

function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString()
}

function AdminPage() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [overview, setOverview] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedDetails, setSelectedDetails] = useState(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([fetchAdminOverview(token), fetchAdminUsers(token)])
      .then(([overviewData, usersData]) => {
        if (cancelled) {
          return
        }

        setOverview(overviewData)
        setUsers(usersData.users || [])
        setError('')
        if ((usersData.users || []).length > 0) {
          setSelectedUserId(usersData.users[0].user.id)
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(requestError.message || 'Failed to load admin dashboard.')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [token])

  useEffect(() => {
    if (!selectedUserId) {
      return
    }

    let cancelled = false

    fetchAdminUserAttempts(token, selectedUserId)
      .then((data) => {
        if (!cancelled) {
          setSelectedDetails(data)
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(requestError.message || 'Failed to load user details.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [selectedUserId, token])

  const selectedSummary = useMemo(
    () => users.find((entry) => entry.user.id === selectedUserId) ?? null,
    [users, selectedUserId],
  )
  const detailsLoading = Boolean(selectedUserId && selectedDetails?.user?.id !== selectedUserId)

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
            <p className="kicker">Admin</p>
            <h1>Admin Dashboard</h1>
            <p className="muted-text">
              Monitor users, finished attempts, unfinished activity, and score performance.
            </p>
          </div>
          <div className="battle-hud">
            <span className="hud-chip">
              <ShieldCheck size={14} />
              Admin Only
            </span>
            <span className="hud-chip">
              <Users size={14} />
              Users: {users.length}
            </span>
          </div>
        </div>
      </Motion.section>

      {loading ? (
        <section className="glass-panel quiz-setup">
          <p className="muted-text">Loading admin dashboard...</p>
        </section>
      ) : error ? (
        <section className="glass-panel quiz-setup">
          <p className="auth-error">{error}</p>
        </section>
      ) : (
        <>
          {overview && (
            <section className="glass-panel admin-overview-grid">
              <div className="progress-panel-row">
                <span>Total users</span>
                <strong>{overview.totalUsers}</strong>
              </div>
              <div className="progress-panel-row">
                <span>Admins</span>
                <strong>{overview.adminUsers}</strong>
              </div>
              <div className="progress-panel-row">
                <span>Total attempts</span>
                <strong>{overview.totalAttempts}</strong>
              </div>
              <div className="progress-panel-row">
                <span>Finished</span>
                <strong>{overview.finishedAttempts}</strong>
              </div>
              <div className="progress-panel-row">
                <span>In progress</span>
                <strong>{overview.inProgressAttempts}</strong>
              </div>
              <div className="progress-panel-row">
                <span>Abandoned</span>
                <strong>{overview.abandonedAttempts}</strong>
              </div>
            </section>
          )}

          <section className="glass-panel admin-grid">
            <div className="admin-users-list">
              <p className="count-title">Users</p>
              <div className="admin-users-scroll">
                {users.map((entry) => (
                  <button
                    className={`admin-user-card ${selectedUserId === entry.user.id ? 'active' : ''}`}
                    key={entry.user.id}
                    onClick={() => setSelectedUserId(entry.user.id)}
                    type="button"
                  >
                    <div className="admin-user-top">
                      <strong className="inline-user">
                        <UserAvatar size="xs" user={entry.user} />
                        {entry.user.name}
                      </strong>
                      <span className="admin-role-chip">{entry.user.role}</span>
                    </div>
                    <small>{entry.user.email}</small>
                    <div className="admin-user-stats">
                      <span>Perf: {entry.performanceScore}</span>
                      <span>Pts: {entry.totalPoints}</span>
                      <span>Fin: {entry.finishedAttempts}</span>
                      <span>Comp: {entry.completionRate}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-details-panel">
              {!selectedSummary ? (
                <p className="muted-text">Select a user.</p>
              ) : (
                <>
                  <p className="count-title">Selected user details</p>
                  <div className="admin-user-full">
                    <div className="progress-panel-row">
                      <span>User ID</span>
                      <strong>{selectedSummary.user.id}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Name</span>
                      <strong className="inline-user">
                        <UserAvatar size="xs" user={selectedSummary.user} />
                        {selectedSummary.user.name}
                      </strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Email</span>
                      <strong>{selectedSummary.user.email}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Role</span>
                      <strong>{selectedSummary.user.role}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Created</span>
                      <strong>{formatDate(selectedSummary.user.createdAt)}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Last activity</span>
                      <strong>{formatDate(selectedSummary.lastActivityAt)}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Total attempts</span>
                      <strong>{selectedSummary.totalAttempts}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Finished</span>
                      <strong>{selectedSummary.finishedAttempts}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>In progress</span>
                      <strong>{selectedSummary.inProgressAttempts}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Abandoned</span>
                      <strong>{selectedSummary.abandonedAttempts}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Performance score</span>
                      <strong>{selectedSummary.performanceScore}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Total points</span>
                      <strong>{selectedSummary.totalPoints}</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Completion rate</span>
                      <strong>{selectedSummary.completionRate}%</strong>
                    </div>
                    <div className="progress-panel-row">
                      <span>Avg score</span>
                      <strong>{selectedSummary.averagePercent}%</strong>
                    </div>
                  </div>

                  <p className="count-title">Attempts</p>
                  {detailsLoading ? (
                    <p className="muted-text">Loading attempts...</p>
                  ) : (
                    <div className="admin-attempts-list">
                      {(selectedDetails?.attempts || []).length === 0 ? (
                        <p className="muted-text">No attempts yet.</p>
                      ) : (
                        (selectedDetails?.attempts || []).map((attempt) => (
                          <div className="admin-attempt-row" key={attempt.id}>
                            <div className="admin-attempt-head">
                              <strong>#{attempt.id}</strong>
                              <span className={`admin-status status-${attempt.status}`}>
                                {attempt.status}
                              </span>
                            </div>
                            <small>
                              {attempt.modeId} | {attempt.topicLabel}
                            </small>
                            <small>
                              Score: {attempt.correctAnswers}/{attempt.questionCount} ({attempt.percent}%)
                              | Points: {attempt.points}
                            </small>
                            <small>Started: {formatDate(attempt.startedAt)}</small>
                            <small>Finished: {formatDate(attempt.finishedAt)}</small>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default AdminPage
