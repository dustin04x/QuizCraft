import React, { useEffect, useMemo, useState } from 'react'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { readProgress, computeProgressSnapshot } from '../data/progressStore.js'
import { TOPICS } from '../data/questionBank.js'
import { useAuth } from '../context/useAuth.jsx'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

function shortLabel(iso) {
  try {
    const d = new Date(iso)
    return `${d.getMonth() + 1}/${d.getDate()}`
  } catch {
    return iso
  }
}

export default function Dashboard() {
  const { user } = useAuth()
  const [progress, setProgress] = useState(() => readProgress(user?.id))

  useEffect(() => {
    setProgress(readProgress(user?.id))
  }, [user?.id])

  const snapshot = useMemo(() => computeProgressSnapshot(progress, TOPICS), [progress])

  const sessions = progress.sessions ?? []

  const lineData = useMemo(() => {
    const labels = sessions.slice().reverse().map((s) => shortLabel(s.timestamp))
    const data = sessions.slice().reverse().map((s) => Number(s.percent ?? 0))
    return {
      labels,
      datasets: [
        {
          label: 'Session score %',
          data,
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79,70,229,0.15)',
          tension: 0.3,
          fill: true,
        },
      ],
    }
  }, [sessions])

  const topicStats = progress.topicStats ?? {}
  const doughnutData = useMemo(() => {
    const labels = TOPICS.map((t) => t.name)
    const values = TOPICS.map((t) => topicStats[t.id]?.attempts ?? 0)
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: labels.map((_, i) => `hsl(${(i * 45) % 360} 70% 55% / 0.9)`),
        },
      ],
    }
  }, [topicStats])

  const barData = useMemo(() => {
    const entries = Object.entries(topicStats || {}).map(([topicId, stats]) => ({
      topicId,
      attempts: Number(stats.attempts ?? 0),
      accuracy: stats.attempts ? (Number(stats.correct ?? 0) / Number(stats.attempts)) * 100 : 0,
    }))
    const top = entries.sort((a, b) => b.attempts - a.attempts).slice(0, 6)
    return {
      labels: top.map((t) => TOPICS.find((x) => x.id === t.topicId)?.name ?? t.topicId),
      datasets: [
        {
          label: 'Attempts',
          data: top.map((t) => t.attempts),
          backgroundColor: '#06b6d4',
        },
        {
          label: 'Accuracy %',
          data: top.map((t) => Math.round(t.accuracy)),
          backgroundColor: '#f59e0b',
        },
      ],
    }
  }, [topicStats])

  return (
    <section className="glass-panel profile-dashboard">
      <div className="dashboard-header">
        <h2>Performance Dashboard</h2>
        <p className="muted-text">Quick glance at your recent progress and topic breakdown.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-cards">
          <div className="stat-card">
            <p className="stat-title">Sessions</p>
            <p className="stat-value">{snapshot.sessionsPlayed}</p>
          </div>
          <div className="stat-card">
            <p className="stat-title">Average</p>
            <p className="stat-value">{snapshot.averagePercent}%</p>
          </div>
          <div className="stat-card">
            <p className="stat-title">Best</p>
            <p className="stat-value">{snapshot.bestPercent}%</p>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-card">
            <h3>Recent Sessions</h3>
            <Line data={lineData} />
          </div>

          <div className="chart-card">
            <h3>Topics Attempted</h3>
            <Doughnut data={doughnutData} />
          </div>
        </div>

        <div className="chart-card wide">
          <h3>Top Topics: Attempts vs Accuracy</h3>
          <Bar data={barData} />
        </div>
      </div>

      <style>{`
        .profile-dashboard { padding: 1rem; }
        .dashboard-header h2 { margin: 0 0 6px 0 }
        .dashboard-grid { display: grid; gap: 12px }
        .dashboard-cards { display:flex; gap:12px }
        .stat-card { background: rgba(255,255,255,0.03); padding:12px; border-radius:8px; min-width:90px }
        .stat-title { color: #94a3b8; font-size:12px; margin:0 }
        .stat-value { font-size:20px; margin:4px 0 0 0 }
        .chart-row { display:flex; gap:12px; flex-wrap:wrap }
        .chart-card { background: rgba(255,255,255,0.02); padding:12px; border-radius:8px; flex:1; min-width:260px }
        .chart-card.wide { grid-column: 1 / -1 }
      `}</style>
    </section>
  )
}
