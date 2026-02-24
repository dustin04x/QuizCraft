import { motion as Motion } from 'framer-motion'
import { Medal, Trophy } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import UserAvatar from '../components/UserAvatar.jsx'
import { useAuth } from '../context/useAuth.jsx'
import { fetchLeaderboard } from '../data/quizApi.js'

function formatRank(rank) {
  if (rank === 1) {
    return '1st'
  }
  if (rank === 2) {
    return '2nd'
  }
  if (rank === 3) {
    return '3rd'
  }
  return `${rank}th`
}

const SORT_OPTIONS = [
  { id: 'performance', label: 'Overall Performance' },
  { id: 'points', label: 'Total Points' },
  { id: 'accuracy', label: 'Accuracy' },
  { id: 'completion', label: 'Completion Rate' },
]

function ScoreboardPage() {
  const { token, user } = useAuth()
  const [sortBy, setSortBy] = useState('performance')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [payload, setPayload] = useState({
    leaderboard: [],
    currentUser: null,
  })

  useEffect(() => {
    let cancelled = false

    fetchLeaderboard(token, sortBy)
      .then((data) => {
        if (!cancelled) {
          setPayload(data)
          setError('')
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(requestError.message || 'Failed to load scoreboard.')
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
  }, [token, sortBy])

  const { leaderboard, currentUser } = payload
  const topThree = useMemo(() => leaderboard.slice(0, 3), [leaderboard])

  const handleSortChange = (event) => {
    setError('')
    setLoading(true)
    setSortBy(event.target.value)
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
            <p className="kicker">Leaderboard</p>
            <h1>Global Scoreboard</h1>
            <p className="muted-text">
              Performance ranking blends points, accuracy, completion rate, and consistency.
            </p>
          </div>
          <div className="battle-hud">
            <span className="hud-chip">
              <Trophy size={14} />
              Live Ranking
            </span>
            {currentUser && (
              <span className="hud-chip">
                <Medal size={14} />
                Your rank: {formatRank(currentUser.rank)}
              </span>
            )}
          </div>
        </div>
      </Motion.section>

      {loading ? (
        <section className="glass-panel quiz-setup">
          <p className="muted-text">Loading scoreboard...</p>
        </section>
      ) : error ? (
        <section className="glass-panel quiz-setup">
          <p className="auth-error">{error}</p>
        </section>
      ) : (
        <>
          <section className="glass-panel podium-grid">
            {topThree.map((entry) => (
              <div className={`podium-card rank-${entry.rank}`} key={entry.user.id}>
                <p className="kicker">{formatRank(entry.rank)}</p>
                <p className="podium-user">
                  <UserAvatar size="sm" user={entry.user} />
                  {entry.user.name}
                </p>
                <p className="muted-text">
                  Score: {entry.performanceScore} | Points: {entry.totalPoints}
                </p>
              </div>
            ))}
          </section>

          <section className="glass-panel scoreboard-table-wrap">
            <div className="scoreboard-toolbar">
              <label className="scoreboard-sort">
                <span>Sort by</span>
                <select onChange={handleSortChange} value={sortBy}>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="scoreboard-table">
              <div className="scoreboard-row header">
                <span>Rank</span>
                <span>User</span>
                <span>Perf</span>
                <span>Points</span>
                <span>Finished</span>
                <span>Complete %</span>
                <span>Avg %</span>
                <span>Best %</span>
              </div>
              {leaderboard.map((entry) => (
                <div
                  className={`scoreboard-row ${entry.user.id === user?.id ? 'me' : ''}`}
                  key={entry.user.id}
                >
                  <span>{formatRank(entry.rank)}</span>
                  <span className="score-user-cell">
                    <UserAvatar size="xs" user={entry.user} />
                    {entry.user.name}
                  </span>
                  <span>{entry.performanceScore}</span>
                  <span>{entry.totalPoints}</span>
                  <span>{entry.finishedAttempts}</span>
                  <span>{entry.completionRate}%</span>
                  <span>{entry.averagePercent}%</span>
                  <span>{entry.bestPercent}%</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default ScoreboardPage
