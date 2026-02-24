import { useEffect, useState } from 'react'
import { fetchCurrentUser, loginUser, registerUser, updateProfile as updateProfileApi } from '../data/authApi.js'
import { clearAuthSession, readAuthSession, writeAuthSession } from '../data/authStore.js'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readAuthSession())
  const [isLoading, setIsLoading] = useState(false)

  const setNextSession = (nextSession) => {
    setSession(nextSession)
    if (nextSession) {
      writeAuthSession(nextSession)
      return
    }
    clearAuthSession()
  }

  const register = async ({ name, email, password }) => {
    setIsLoading(true)
    try {
      const data = await registerUser({ name, email, password })
      const nextSession = { user: data.user, token: data.token }
      setNextSession(nextSession)
      return nextSession
    } finally {
      setIsLoading(false)
    }
  }

  const login = async ({ email, password }) => {
    setIsLoading(true)
    try {
      const data = await loginUser({ email, password })
      const nextSession = { user: data.user, token: data.token }
      setNextSession(nextSession)
      return nextSession
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setNextSession(null)
  }

  const updateProfile = async (payload) => {
    if (!session?.token) {
      throw new Error('You must be logged in.')
    }

    setIsLoading(true)
    try {
      const data = await updateProfileApi(session.token, payload)
      setSession((previous) => {
        if (!previous?.token) {
          return previous
        }

        const nextSession = {
          token: previous.token,
          user: data.user,
        }
        writeAuthSession(nextSession)
        return nextSession
      })
      return data.user
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!session?.token) {
      return
    }

    let cancelled = false

    fetchCurrentUser(session.token)
      .then((data) => {
        if (cancelled) {
          return
        }
        setSession((previous) => {
          if (!previous?.token) {
            return previous
          }

          const nextSession = {
            token: previous.token,
            user: data.user,
          }
          writeAuthSession(nextSession)
          return nextSession
        })
      })
      .catch(() => {
        if (!cancelled) {
          setSession(null)
          clearAuthSession()
        }
      })

    return () => {
      cancelled = true
    }
  }, [session?.token])

  const value = {
    user: session?.user ?? null,
    token: session?.token ?? null,
    isAuthenticated: Boolean(session?.token),
    isAdmin: session?.user?.role === 'admin',
    isLoading,
    register,
    login,
    updateProfile,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
