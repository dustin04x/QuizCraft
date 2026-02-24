const API_BASE = String(import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

function buildApiUrl(path) {
  return `${API_BASE}${path}`
}

async function requestApi(path, { method = 'GET', payload, token } = {}) {
  const response = await fetch(buildApiUrl(path), {
    method,
    headers: {
      ...(payload ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

export function startAttempt(token, payload) {
  return requestApi('/api/attempts/start', { method: 'POST', payload, token })
}

export function finishAttempt(token, attemptId, payload) {
  return requestApi(`/api/attempts/${attemptId}/finish`, { method: 'PATCH', payload, token })
}

export function abandonAttempt(token, attemptId) {
  return requestApi(`/api/attempts/${attemptId}/abandon`, { method: 'PATCH', token })
}

export function fetchLeaderboard(token, sortBy = 'performance') {
  const query = encodeURIComponent(sortBy)
  return requestApi(`/api/leaderboard?sort=${query}`, { method: 'GET', token })
}

export function fetchAdminOverview(token) {
  return requestApi('/api/admin/overview', { method: 'GET', token })
}

export function fetchAdminUsers(token) {
  return requestApi('/api/admin/users', { method: 'GET', token })
}

export function fetchAdminUserAttempts(token, userId) {
  return requestApi(`/api/admin/users/${userId}/attempts`, { method: 'GET', token })
}
