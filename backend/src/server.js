import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDb } from './db.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT ?? 4000)
const JWT_SECRET = process.env.JWT_SECRET ?? 'quizcraft-dev-secret'
const ADMIN_EMAIL = normalizeEmail(process.env.ADMIN_EMAIL ?? 'admin@example.com')
const MODE_MULTIPLIERS = {
  classic: 1,
  timed: 1.2,
  exam: 1.35,
  review: 0.9,
}

app.use(cors())
app.use(express.json())

function normalizeEmail(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
}

function parsePositiveInteger(value) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

function asNonNegativeInteger(value) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0
}

function normalizeAvatarUrl(value) {
  const raw = String(value ?? '').trim()
  if (!raw) {
    return null
  }

  if (raw.length > 2000) {
    return null
  }

  try {
    const parsedUrl = new URL(raw)
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return null
    }
    return raw
  } catch {
    return null
  }
}

function getModeMultiplier(modeId) {
  const key = String(modeId ?? '').trim()
  return MODE_MULTIPLIERS[key] ?? 1
}

function computePoints({ correctAnswers, percent, modeId, questionCount }) {
  const perfectBonus = percent === 100 ? 25 : 0
  const volumeBonus = questionCount >= 15 ? 10 : questionCount >= 10 ? 5 : 0
  const basePoints = correctAnswers * 10 + perfectBonus + volumeBonus
  return Math.round(basePoints * getModeMultiplier(modeId))
}

function computeCompletionRate({ finishedAttempts, inProgressAttempts, abandonedAttempts }) {
  const totalAttempts = finishedAttempts + inProgressAttempts + abandonedAttempts
  if (!totalAttempts) {
    return 0
  }
  return Math.round((finishedAttempts / totalAttempts) * 100)
}

function computePerformanceScore({
  totalPoints,
  averagePercent,
  completionRate,
  finishedAttempts,
  abandonedAttempts,
}) {
  return Math.round(
    totalPoints +
      averagePercent * 2 +
      completionRate +
      finishedAttempts * 5 -
      abandonedAttempts * 3,
  )
}

function getLeaderboardSorter(sortBy) {
  if (sortBy === 'accuracy') {
    return (left, right) =>
      right.averagePercent - left.averagePercent ||
      right.bestPercent - left.bestPercent ||
      right.performanceScore - left.performanceScore
  }

  if (sortBy === 'completion') {
    return (left, right) =>
      right.completionRate - left.completionRate ||
      right.finishedAttempts - left.finishedAttempts ||
      right.performanceScore - left.performanceScore
  }

  if (sortBy === 'points') {
    return (left, right) =>
      right.totalPoints - left.totalPoints ||
      right.performanceScore - left.performanceScore
  }

  return (left, right) =>
    right.performanceScore - left.performanceScore ||
    right.totalPoints - left.totalPoints ||
    right.averagePercent - left.averagePercent
}

function toShortDate(value) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return String(value ?? '')
  }
  return `${parsed.getMonth() + 1}/${parsed.getDate()}`
}

function toWeekdayLabel(value) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return String(value ?? '')
  }
  return parsed.toLocaleDateString('en-US', { weekday: 'short' })
}

function getLastSevenDays() {
  const days = []
  const now = new Date()
  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date(now)
    date.setDate(now.getDate() - index)
    days.push({
      iso: date.toISOString().slice(0, 10),
      label: toWeekdayLabel(date),
    })
  }
  return days
}

function buildPublicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    avatarUrl: row.avatar_url ?? null,
    role: row.role ?? 'user',
    createdAt: row.created_at ?? null,
  }
}

function buildToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role ?? 'user',
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  )
}

function buildAttempt(row) {
  return {
    id: row.id,
    userId: row.user_id,
    modeId: row.mode_id,
    topicId: row.topic_id,
    topicLabel: row.topic_label,
    questionCount: Number(row.question_count ?? 0),
    correctAnswers: Number(row.correct_answers ?? 0),
    percent: Number(row.percent ?? 0),
    points: Number(row.points ?? 0),
    status: row.status,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    updatedAt: row.updated_at,
  }
}

async function getUserById(userId) {
  const db = await getDb()
  return db.get(
    'SELECT id, name, email, avatar_url, role, created_at FROM users WHERE id = ?',
    userId,
  )
}

async function adminMiddleware(request, response, next) {
  const user = await getUserById(request.auth.sub)
  if (!user) {
    response.status(401).json({ message: 'User not found.' })
    return
  }

  if (user.role !== 'admin') {
    response.status(403).json({ message: 'Admin access required.' })
    return
  }

  request.adminUser = user
  next()
}

function authMiddleware(request, response, next) {
  const authorization = request.headers.authorization ?? ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null

  if (!token) {
    response.status(401).json({ message: 'Missing authentication token.' })
    return
  }

  try {
    request.auth = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    response.status(401).json({ message: 'Invalid or expired token.' })
  }
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/auth/register', async (request, response) => {
  const name = String(request.body?.name ?? '').trim()
  const email = normalizeEmail(request.body?.email)
  const password = String(request.body?.password ?? '')
  const role = email === ADMIN_EMAIL && ADMIN_EMAIL ? 'admin' : 'user'

  if (!name || !email || !password) {
    response.status(400).json({ message: 'Name, email, and password are required.' })
    return
  }

  if (password.length < 6) {
    response.status(400).json({ message: 'Password must be at least 6 characters.' })
    return
  }

  const db = await getDb()
  const existingUser = await db.get('SELECT id FROM users WHERE email = ?', email)

  if (existingUser) {
    response.status(409).json({ message: 'An account already exists with this email.' })
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const result = await db.run(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    name,
    email,
    passwordHash,
    role,
  )
  const userRow = await db.get(
    'SELECT id, name, email, avatar_url, role, created_at FROM users WHERE id = ?',
    result.lastID,
  )
  const user = buildPublicUser(userRow)

  response.status(201).json({
    user,
    token: buildToken(user),
  })
})

app.post('/api/auth/login', async (request, response) => {
  const email = normalizeEmail(request.body?.email)
  const password = String(request.body?.password ?? '')

  if (!email || !password) {
    response.status(400).json({ message: 'Email and password are required.' })
    return
  }

  const db = await getDb()
  const userRow = await db.get(
    'SELECT id, name, email, avatar_url, role, created_at, password_hash FROM users WHERE email = ?',
    email,
  )

  if (!userRow) {
    response.status(401).json({ message: 'Invalid email or password.' })
    return
  }

  const passwordMatches = await bcrypt.compare(password, userRow.password_hash)

  if (!passwordMatches) {
    response.status(401).json({ message: 'Invalid email or password.' })
    return
  }

  const user = buildPublicUser(userRow)

  response.json({
    user,
    token: buildToken(user),
  })
})

app.get('/api/auth/me', authMiddleware, async (request, response) => {
  const user = await getUserById(request.auth.sub)

  if (!user) {
    response.status(404).json({ message: 'User not found.' })
    return
  }

  response.json({ user: buildPublicUser(user) })
})

app.patch('/api/auth/profile', authMiddleware, async (request, response) => {
  const body = request.body ?? {}
  const hasName = Object.prototype.hasOwnProperty.call(body, 'name')
  const hasAvatarUrl = Object.prototype.hasOwnProperty.call(body, 'avatarUrl')

  if (!hasName && !hasAvatarUrl) {
    response.status(400).json({ message: 'At least one field (name or avatarUrl) is required.' })
    return
  }

  const existingUser = await getUserById(request.auth.sub)
  if (!existingUser) {
    response.status(404).json({ message: 'User not found.' })
    return
  }

  let nextName = existingUser.name
  let nextAvatarUrl = existingUser.avatar_url ?? null

  if (hasName) {
    const parsedName = String(body.name ?? '').trim()
    if (!parsedName || parsedName.length < 2 || parsedName.length > 50) {
      response.status(400).json({ message: 'Name must be between 2 and 50 characters.' })
      return
    }
    nextName = parsedName
  }

  if (hasAvatarUrl) {
    const rawAvatarUrl = String(body.avatarUrl ?? '').trim()
    if (!rawAvatarUrl) {
      nextAvatarUrl = null
    } else {
      const parsedAvatarUrl = normalizeAvatarUrl(rawAvatarUrl)
      if (!parsedAvatarUrl) {
        response
          .status(400)
          .json({ message: 'avatarUrl must be a valid http(s) image URL or empty.' })
        return
      }
      nextAvatarUrl = parsedAvatarUrl
    }
  }

  const db = await getDb()
  await db.run(
    'UPDATE users SET name = ?, avatar_url = ? WHERE id = ?',
    nextName,
    nextAvatarUrl,
    request.auth.sub,
  )

  const updatedUser = await getUserById(request.auth.sub)
  response.json({ user: buildPublicUser(updatedUser) })
})

app.post('/api/attempts/start', authMiddleware, async (request, response) => {
  const modeId = String(request.body?.modeId ?? '').trim()
  const topicId = String(request.body?.topicId ?? '').trim()
  const topicLabel = String(request.body?.topicLabel ?? '').trim()
  const questionCount = parsePositiveInteger(request.body?.questionCount)

  if (!modeId || !topicId || !topicLabel || !questionCount) {
    response.status(400).json({ message: 'modeId, topicId, topicLabel, and questionCount are required.' })
    return
  }

  const db = await getDb()
  const result = await db.run(
    `
      INSERT INTO quiz_attempts (user_id, mode_id, topic_id, topic_label, question_count, status, updated_at)
      VALUES (?, ?, ?, ?, ?, 'in_progress', CURRENT_TIMESTAMP)
    `,
    request.auth.sub,
    modeId,
    topicId,
    topicLabel,
    questionCount,
  )

  const attempt = await db.get('SELECT * FROM quiz_attempts WHERE id = ?', result.lastID)
  response.status(201).json({ attempt: buildAttempt(attempt) })
})

app.patch('/api/attempts/:attemptId/finish', authMiddleware, async (request, response) => {
  const attemptId = parsePositiveInteger(request.params.attemptId)
  const totalQuestions = parsePositiveInteger(request.body?.totalQuestions)
  const correctAnswers = asNonNegativeInteger(request.body?.correctAnswers)

  if (!attemptId || !totalQuestions) {
    response.status(400).json({ message: 'Valid attemptId and totalQuestions are required.' })
    return
  }

  if (correctAnswers > totalQuestions) {
    response.status(400).json({ message: 'correctAnswers cannot exceed totalQuestions.' })
    return
  }

  const percent = Math.round((correctAnswers / totalQuestions) * 100)

  const db = await getDb()
  const attempt = await db.get(
    'SELECT * FROM quiz_attempts WHERE id = ? AND user_id = ?',
    attemptId,
    request.auth.sub,
  )

  if (!attempt) {
    response.status(404).json({ message: 'Attempt not found.' })
    return
  }

  if (attempt.status !== 'in_progress') {
    response.status(409).json({ message: 'This attempt has already been finalized.' })
    return
  }

  const points = computePoints({
    correctAnswers,
    percent,
    modeId: attempt.mode_id,
    questionCount: totalQuestions,
  })

  await db.run(
    `
      UPDATE quiz_attempts
      SET status = 'finished',
          question_count = ?,
          correct_answers = ?,
          percent = ?,
          points = ?,
          finished_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `,
    totalQuestions,
    correctAnswers,
    percent,
    points,
    attemptId,
    request.auth.sub,
  )

  const updatedAttempt = await db.get('SELECT * FROM quiz_attempts WHERE id = ?', attemptId)
  response.json({ attempt: buildAttempt(updatedAttempt) })
})

app.patch('/api/attempts/:attemptId/abandon', authMiddleware, async (request, response) => {
  const attemptId = parsePositiveInteger(request.params.attemptId)

  if (!attemptId) {
    response.status(400).json({ message: 'Valid attemptId is required.' })
    return
  }

  const db = await getDb()
  const attempt = await db.get(
    'SELECT * FROM quiz_attempts WHERE id = ? AND user_id = ?',
    attemptId,
    request.auth.sub,
  )

  if (!attempt) {
    response.status(404).json({ message: 'Attempt not found.' })
    return
  }

  if (attempt.status === 'in_progress') {
    await db.run(
      `
        UPDATE quiz_attempts
        SET status = 'abandoned',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
      `,
      attemptId,
      request.auth.sub,
    )
  }

  const updatedAttempt = await db.get('SELECT * FROM quiz_attempts WHERE id = ?', attemptId)
  response.json({ attempt: buildAttempt(updatedAttempt) })
})

app.get('/api/stats/me', authMiddleware, async (request, response) => {
  const db = await getDb()
  const userId = request.auth.sub

  const aggregates = await db.get(
    `
      SELECT
        COUNT(*) AS total_attempts,
        COALESCE(SUM(CASE WHEN status = 'finished' THEN 1 ELSE 0 END), 0) AS finished_attempts,
        COALESCE(SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END), 0) AS in_progress_attempts,
        COALESCE(SUM(CASE WHEN status = 'abandoned' THEN 1 ELSE 0 END), 0) AS abandoned_attempts,
        COALESCE(SUM(CASE WHEN status = 'finished' THEN points ELSE 0 END), 0) AS total_points,
        COALESCE(ROUND(AVG(CASE WHEN status = 'finished' THEN percent END)), 0) AS average_percent,
        COALESCE(MAX(CASE WHEN status = 'finished' THEN percent END), 0) AS best_percent
      FROM quiz_attempts
      WHERE user_id = ?
    `,
    userId,
  )

  const finishedAttempts = Number(aggregates.finished_attempts ?? 0)
  const inProgressAttempts = Number(aggregates.in_progress_attempts ?? 0)
  const abandonedAttempts = Number(aggregates.abandoned_attempts ?? 0)
  const totalPoints = Number(aggregates.total_points ?? 0)
  const averagePercent = Number(aggregates.average_percent ?? 0)
  const completionRate = computeCompletionRate({
    finishedAttempts,
    inProgressAttempts,
    abandonedAttempts,
  })
  const performanceScore = computePerformanceScore({
    totalPoints,
    averagePercent,
    completionRate,
    finishedAttempts,
    abandonedAttempts,
  })

  const trendRows = await db.all(
    `
      SELECT id, mode_id, percent, points, finished_at
      FROM quiz_attempts
      WHERE user_id = ? AND status = 'finished'
      ORDER BY finished_at DESC
      LIMIT 12
    `,
    userId,
  )
  const trend = trendRows
    .reverse()
    .map((row) => ({
      id: row.id,
      modeId: row.mode_id,
      percent: Number(row.percent ?? 0),
      points: Number(row.points ?? 0),
      label: toShortDate(row.finished_at),
    }))

  const modeRows = await db.all(
    `
      SELECT
        mode_id,
        COUNT(*) AS finished_attempts,
        COALESCE(ROUND(AVG(percent)), 0) AS average_percent,
        COALESCE(SUM(points), 0) AS total_points
      FROM quiz_attempts
      WHERE user_id = ? AND status = 'finished'
      GROUP BY mode_id
      ORDER BY total_points DESC
    `,
    userId,
  )
  const modePerformance = modeRows.map((row) => ({
    modeId: row.mode_id,
    finishedAttempts: Number(row.finished_attempts ?? 0),
    averagePercent: Number(row.average_percent ?? 0),
    totalPoints: Number(row.total_points ?? 0),
  }))

  const topicRows = await db.all(
    `
      SELECT
        topic_label,
        COUNT(*) AS finished_attempts,
        COALESCE(ROUND(AVG(percent)), 0) AS average_percent,
        COALESCE(SUM(points), 0) AS total_points
      FROM quiz_attempts
      WHERE user_id = ? AND status = 'finished'
      GROUP BY topic_label
      ORDER BY finished_attempts DESC, average_percent DESC
      LIMIT 8
    `,
    userId,
  )
  const topicPerformance = topicRows.map((row) => ({
    topicLabel: row.topic_label,
    finishedAttempts: Number(row.finished_attempts ?? 0),
    averagePercent: Number(row.average_percent ?? 0),
    totalPoints: Number(row.total_points ?? 0),
  }))

  const weeklyRows = await db.all(
    `
      SELECT
        substr(started_at, 1, 10) AS day,
        COUNT(*) AS attempts
      FROM quiz_attempts
      WHERE user_id = ? AND started_at >= datetime('now', '-6 days')
      GROUP BY day
    `,
    userId,
  )
  const weeklyMap = weeklyRows.reduce((acc, row) => {
    acc[row.day] = Number(row.attempts ?? 0)
    return acc
  }, {})
  const weeklyActivity = getLastSevenDays().map((day) => ({
    day: day.label,
    attempts: weeklyMap[day.iso] ?? 0,
  }))

  const recentAttemptsRows = await db.all(
    `
      SELECT
        id,
        user_id,
        mode_id,
        topic_id,
        topic_label,
        question_count,
        correct_answers,
        percent,
        points,
        status,
        started_at,
        finished_at,
        updated_at
      FROM quiz_attempts
      WHERE user_id = ?
      ORDER BY started_at DESC
      LIMIT 8
    `,
    userId,
  )

  response.json({
    summary: {
      totalAttempts: Number(aggregates.total_attempts ?? 0),
      finishedAttempts,
      inProgressAttempts,
      abandonedAttempts,
      totalPoints,
      averagePercent,
      bestPercent: Number(aggregates.best_percent ?? 0),
      completionRate,
      performanceScore,
    },
    charts: {
      trend,
      modePerformance,
      topicPerformance,
      statusBreakdown: [
        { key: 'finished', label: 'Finished', value: finishedAttempts },
        { key: 'in_progress', label: 'In Progress', value: inProgressAttempts },
        { key: 'abandoned', label: 'Abandoned', value: abandonedAttempts },
      ],
      weeklyActivity,
    },
    recentAttempts: recentAttemptsRows.map(buildAttempt),
  })
})

app.get('/api/leaderboard', authMiddleware, async (request, response) => {
  const sortBy = String(request.query?.sort ?? 'performance').trim()
  const sorter = getLeaderboardSorter(sortBy)
  const db = await getDb()
  const rows = await db.all(`
    SELECT
      u.id,
      u.name,
      u.email,
      u.avatar_url,
      u.role,
      u.created_at,
      COALESCE(SUM(CASE WHEN a.status = 'finished' THEN a.points ELSE 0 END), 0) AS total_points,
      COALESCE(COUNT(CASE WHEN a.status = 'finished' THEN 1 END), 0) AS finished_attempts,
      COALESCE(COUNT(CASE WHEN a.status = 'in_progress' THEN 1 END), 0) AS in_progress_attempts,
      COALESCE(COUNT(CASE WHEN a.status = 'abandoned' THEN 1 END), 0) AS abandoned_attempts,
      COALESCE(ROUND(AVG(CASE WHEN a.status = 'finished' THEN a.percent END)), 0) AS average_percent,
      COALESCE(MAX(CASE WHEN a.status = 'finished' THEN a.percent END), 0) AS best_percent
    FROM users u
    LEFT JOIN quiz_attempts a ON a.user_id = u.id
    GROUP BY u.id
    ORDER BY u.created_at ASC
  `)

  const normalized = rows.map((row) => {
    const totalPoints = Number(row.total_points ?? 0)
    const finishedAttempts = Number(row.finished_attempts ?? 0)
    const inProgressAttempts = Number(row.in_progress_attempts ?? 0)
    const abandonedAttempts = Number(row.abandoned_attempts ?? 0)
    const averagePercent = Number(row.average_percent ?? 0)
    const bestPercent = Number(row.best_percent ?? 0)
    const completionRate = computeCompletionRate({
      finishedAttempts,
      inProgressAttempts,
      abandonedAttempts,
    })
    const performanceScore = computePerformanceScore({
      totalPoints,
      averagePercent,
      completionRate,
      finishedAttempts,
      abandonedAttempts,
    })

    return {
      user: buildPublicUser(row),
      totalPoints,
      finishedAttempts,
      inProgressAttempts,
      abandonedAttempts,
      averagePercent,
      bestPercent,
      completionRate,
      performanceScore,
    }
  })

  const ranked = [...normalized]
    .sort(sorter)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))

  response.json({
    scoring: {
      formula:
        'base = (correctAnswers*10) + perfectBonus(25) + volumeBonus(5 or 10), then multiplied by mode',
      modeMultipliers: MODE_MULTIPLIERS,
      ranking:
        'performanceScore = totalPoints + averagePercent*2 + completionRate + finishedAttempts*5 - abandonedAttempts*3',
      sortBy,
      supportedSorts: ['performance', 'points', 'accuracy', 'completion'],
    },
    leaderboard: ranked.slice(0, 50),
    currentUser: ranked.find((entry) => entry.user.id === request.auth.sub) ?? null,
  })
})

app.get('/api/admin/overview', authMiddleware, adminMiddleware, async (_request, response) => {
  const db = await getDb()
  const userCounts = await db.get(`
    SELECT
      COUNT(*) AS total_users,
      SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) AS admin_users
    FROM users
  `)

  const attemptCounts = await db.get(`
    SELECT
      COUNT(*) AS total_attempts,
      SUM(CASE WHEN status = 'finished' THEN 1 ELSE 0 END) AS finished_attempts,
      SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_attempts,
      SUM(CASE WHEN status = 'abandoned' THEN 1 ELSE 0 END) AS abandoned_attempts
    FROM quiz_attempts
  `)

  response.json({
    totalUsers: Number(userCounts?.total_users ?? 0),
    adminUsers: Number(userCounts?.admin_users ?? 0),
    totalAttempts: Number(attemptCounts?.total_attempts ?? 0),
    finishedAttempts: Number(attemptCounts?.finished_attempts ?? 0),
    inProgressAttempts: Number(attemptCounts?.in_progress_attempts ?? 0),
    abandonedAttempts: Number(attemptCounts?.abandoned_attempts ?? 0),
  })
})

app.get('/api/admin/users', authMiddleware, adminMiddleware, async (_request, response) => {
  const db = await getDb()
  const rows = await db.all(`
    SELECT
      u.id,
      u.name,
      u.email,
      u.avatar_url,
      u.role,
      u.created_at,
      COALESCE(COUNT(a.id), 0) AS total_attempts,
      COALESCE(SUM(CASE WHEN a.status = 'finished' THEN 1 ELSE 0 END), 0) AS finished_attempts,
      COALESCE(SUM(CASE WHEN a.status = 'in_progress' THEN 1 ELSE 0 END), 0) AS in_progress_attempts,
      COALESCE(SUM(CASE WHEN a.status = 'abandoned' THEN 1 ELSE 0 END), 0) AS abandoned_attempts,
      COALESCE(SUM(CASE WHEN a.status = 'finished' THEN a.points ELSE 0 END), 0) AS total_points,
      COALESCE(ROUND(AVG(CASE WHEN a.status = 'finished' THEN a.percent END)), 0) AS average_percent,
      MAX(COALESCE(a.finished_at, a.updated_at, a.started_at)) AS last_activity_at
    FROM users u
    LEFT JOIN quiz_attempts a ON a.user_id = u.id
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `)

  response.json({
    users: rows.map((row) => {
      const finishedAttempts = Number(row.finished_attempts ?? 0)
      const inProgressAttempts = Number(row.in_progress_attempts ?? 0)
      const abandonedAttempts = Number(row.abandoned_attempts ?? 0)
      const totalPoints = Number(row.total_points ?? 0)
      const averagePercent = Number(row.average_percent ?? 0)
      const completionRate = computeCompletionRate({
        finishedAttempts,
        inProgressAttempts,
        abandonedAttempts,
      })
      const performanceScore = computePerformanceScore({
        totalPoints,
        averagePercent,
        completionRate,
        finishedAttempts,
        abandonedAttempts,
      })

      return {
        user: buildPublicUser(row),
        totalAttempts: Number(row.total_attempts ?? 0),
        finishedAttempts,
        inProgressAttempts,
        abandonedAttempts,
        totalPoints,
        averagePercent,
        completionRate,
        performanceScore,
        lastActivityAt: row.last_activity_at ?? null,
      }
    }),
  })
})

app.get('/api/admin/users/:userId/attempts', authMiddleware, adminMiddleware, async (request, response) => {
  const userId = parsePositiveInteger(request.params.userId)
  if (!userId) {
    response.status(400).json({ message: 'Valid userId is required.' })
    return
  }

  const db = await getDb()
  const user = await db.get(
    'SELECT id, name, email, avatar_url, role, created_at FROM users WHERE id = ?',
    userId,
  )

  if (!user) {
    response.status(404).json({ message: 'User not found.' })
    return
  }

  const attempts = await db.all(
    `
      SELECT
        id,
        user_id,
        mode_id,
        topic_id,
        topic_label,
        question_count,
        correct_answers,
        percent,
        points,
        status,
        started_at,
        finished_at,
        updated_at
      FROM quiz_attempts
      WHERE user_id = ?
      ORDER BY started_at DESC
    `,
    userId,
  )

  response.json({
    user: buildPublicUser(user),
    attempts: attempts.map(buildAttempt),
  })
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ message: 'Internal server error.' })
})

getDb()
  .then(async (db) => {
    if (ADMIN_EMAIL) {
      await db.run("UPDATE users SET role = 'admin' WHERE email = ?", ADMIN_EMAIL)
    }

    app.listen(PORT, () => {
      console.log(`QuizCraft API running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
