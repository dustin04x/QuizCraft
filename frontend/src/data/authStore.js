const AUTH_STORAGE_KEY = 'quizcraft-auth-v1'

function sanitizeSession(rawValue) {
  if (!rawValue || typeof rawValue !== 'object') {
    return null
  }

  const token = String(rawValue.token ?? '').trim()
  const user = rawValue.user && typeof rawValue.user === 'object' ? rawValue.user : null

  if (!token || !user || !user.id) {
    return null
  }

  return {
    token,
    user: {
      id: user.id,
      name: String(user.name ?? ''),
      email: String(user.email ?? ''),
      avatarUrl: user.avatarUrl ? String(user.avatarUrl) : null,
      role: String(user.role ?? 'user'),
      createdAt: user.createdAt ?? null,
    },
  }
}

export function readAuthSession() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const serialized = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!serialized) {
      return null
    }
    return sanitizeSession(JSON.parse(serialized))
  } catch {
    return null
  }
}

export function writeAuthSession(session) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export function clearAuthSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}
