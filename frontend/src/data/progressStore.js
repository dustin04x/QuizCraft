const STORAGE_KEY_PREFIX = 'quizcraft-progress-v1'
const LEGACY_STORAGE_KEY = 'quizcraft-progress-v1'
const MAX_SESSION_HISTORY = 40

function getStorageKey(userId) {
  const safeUserId = userId ? String(userId) : 'guest'
  return `${STORAGE_KEY_PREFIX}:${safeUserId}`
}

function createEmptyProgress() {
  return {
    sessions: [],
    questionStats: {},
    topicStats: {},
  }
}

function sanitizeProgress(rawValue) {
  if (!rawValue || typeof rawValue !== 'object') {
    return createEmptyProgress()
  }

  const sessions = Array.isArray(rawValue.sessions) ? rawValue.sessions : []
  const questionStats =
    rawValue.questionStats && typeof rawValue.questionStats === 'object'
      ? rawValue.questionStats
      : {}
  const topicStats =
    rawValue.topicStats && typeof rawValue.topicStats === 'object' ? rawValue.topicStats : {}

  return {
    sessions,
    questionStats,
    topicStats,
  }
}

export function readProgress(userId = 'guest') {
  if (typeof window === 'undefined') {
    return createEmptyProgress()
  }

  try {
    const storageKey = getStorageKey(userId)
    const serialized = window.localStorage.getItem(storageKey)
    if (!serialized) {
      if (String(userId) === 'guest') {
        const legacySerialized = window.localStorage.getItem(LEGACY_STORAGE_KEY)
        if (legacySerialized) {
          const migrated = sanitizeProgress(JSON.parse(legacySerialized))
          window.localStorage.setItem(storageKey, JSON.stringify(migrated))
          return migrated
        }
      }
      return createEmptyProgress()
    }
    return sanitizeProgress(JSON.parse(serialized))
  } catch {
    return createEmptyProgress()
  }
}

export function writeProgress(progress, userId = 'guest') {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(progress))
}

function createSession({ modeId, topicId, topicLabel, results }) {
  const total = results.length
  const score = results.filter((entry) => entry.isCorrect).length
  const wrongQuestionIds = results
    .filter((entry) => !entry.isCorrect)
    .map((entry) => entry.questionId)

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    modeId,
    topicId,
    topicLabel,
    total,
    score,
    percent: total ? Math.round((score / total) * 100) : 0,
    wrongQuestionIds,
  }
}

export function getDrillQuestionIds(progress) {
  return Object.entries(progress.questionStats)
    .filter(([, stats]) => Number(stats?.wrong) > 0)
    .sort(([, left], [, right]) => {
      if ((right.wrong ?? 0) !== (left.wrong ?? 0)) {
        return (right.wrong ?? 0) - (left.wrong ?? 0)
      }
      return (right.attempts ?? 0) - (left.attempts ?? 0)
    })
    .map(([questionId]) => questionId)
}

export function recordSession(progress, payload) {
  const base = sanitizeProgress(progress)
  const session = createSession(payload)
  const updatedQuestionStats = { ...base.questionStats }
  const updatedTopicStats = { ...base.topicStats }

  payload.results.forEach((entry) => {
    const previous = updatedQuestionStats[entry.questionId] ?? {
      attempts: 0,
      correct: 0,
      wrong: 0,
    }

    updatedQuestionStats[entry.questionId] = {
      attempts: previous.attempts + 1,
      correct: previous.correct + Number(entry.isCorrect),
      wrong: previous.wrong + Number(!entry.isCorrect),
    }
    const topicPrevious = updatedTopicStats[entry.topicId] ?? {
      attempts: 0,
      correct: 0,
      wrong: 0,
    }

    updatedTopicStats[entry.topicId] = {
      attempts: topicPrevious.attempts + 1,
      correct: topicPrevious.correct + Number(entry.isCorrect),
      wrong: topicPrevious.wrong + Number(!entry.isCorrect),
    }
  })

  if (payload.topicId === 'all' || payload.topicId === 'review') {
    const mixedTopicPrevious = updatedTopicStats[payload.topicId] ?? {
      attempts: 0,
      correct: 0,
      wrong: 0,
    }

    updatedTopicStats[payload.topicId] = {
      attempts: mixedTopicPrevious.attempts + session.total,
      correct: mixedTopicPrevious.correct + session.score,
      wrong: mixedTopicPrevious.wrong + (session.total - session.score),
    }
  }

  return {
    sessions: [session, ...base.sessions].slice(0, MAX_SESSION_HISTORY),
    questionStats: updatedQuestionStats,
    topicStats: updatedTopicStats,
  }
}

export function computeProgressSnapshot(progress, topics) {
  const safeProgress = sanitizeProgress(progress)
  const sessionsPlayed = safeProgress.sessions.length
  const averagePercent = sessionsPlayed
    ? Math.round(
        safeProgress.sessions.reduce((sum, session) => sum + Number(session.percent ?? 0), 0) /
          sessionsPlayed,
      )
    : 0
  const bestPercent = sessionsPlayed
    ? Math.max(...safeProgress.sessions.map((session) => Number(session.percent ?? 0)))
    : 0

  const topicMap = topics.reduce((acc, topic) => {
    acc[topic.id] = topic.name
    return acc
  }, {})

  const weakestTopicEntry = Object.entries(safeProgress.topicStats)
    .filter(([, stats]) => Number(stats?.attempts) >= 6)
    .map(([topicId, stats]) => ({
      topicId,
      attempts: Number(stats.attempts ?? 0),
      accuracy: Number(stats.correct ?? 0) / Math.max(1, Number(stats.attempts ?? 0)),
    }))
    .sort((left, right) => {
      if (left.accuracy !== right.accuracy) {
        return left.accuracy - right.accuracy
      }
      return right.attempts - left.attempts
    })[0]

  return {
    sessionsPlayed,
    averagePercent,
    bestPercent,
    lastSession: safeProgress.sessions[0] ?? null,
    reviewQuestionIds: getDrillQuestionIds(safeProgress),
    weakestTopicLabel: weakestTopicEntry
      ? topicMap[weakestTopicEntry.topicId] ?? 'Mixed topics'
      : null,
  }
}
