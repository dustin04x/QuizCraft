const API_BASE = String(import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

function buildApiUrl(path) {
  return `${API_BASE}${path}`
}

async function apiRequest(path, { method = 'POST', payload, token } = {}) {
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

export function registerUser(payload) {
  return apiRequest('/api/auth/register', { method: 'POST', payload })
}

export function loginUser(payload) {
  return apiRequest('/api/auth/login', { method: 'POST', payload })
}

export function fetchCurrentUser(token) {
  return apiRequest('/api/auth/me', { method: 'GET', token })
}

export function updateProfile(token, payload) {
  return apiRequest('/api/auth/profile', { method: 'PATCH', token, payload })
}
