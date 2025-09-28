"use client"

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface AuthUser {
  name?: string
  email?: string
  mobile?: string
  age?: string
  profilePic?: string
}

export interface AuthState {
  user: AuthUser | null
  role: string
  region: string
  zone: string
  district: string
  schoolName: string
  udiseCode: string
  schoolCategory: string
  token?: string
}

interface AuthContextValue extends AuthState {
  setAuth: (next: Partial<AuthState>) => void
  resetAuth: () => void
  login: (payload: Partial<AuthState>) => void
  signup: (payload: Partial<AuthState>) => void
  logout: () => void
}

const defaultState: AuthState = {
  user: null,
  role: '',
  region: '',
  zone: '',
  district: '',
  schoolName: '',
  udiseCode: '',
  schoolCategory: '',
  token: undefined
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultState)

  const setAuth = (next: Partial<AuthState>) => setState((s) => ({ ...s, ...next }))
  const resetAuth = () => setState(defaultState)
  const login = (payload: Partial<AuthState>) => setState((s) => ({ ...s, ...payload }))
  const signup = (payload: Partial<AuthState>) => setState((s) => ({ ...s, ...payload }))
  const logout = () => {
    setState(defaultState)
  }

  // persist in localStorage for demo purposes
  useEffect(() => {
    try { 
      localStorage.setItem('auth_state', JSON.stringify(state)) 
    } catch {}
  }, [state])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('auth_state')
      if (saved) {
        const parsedState = JSON.parse(saved)
        setState(parsedState)
      }
    } catch {}
  }, [])

  const value = useMemo<AuthContextValue>(() => ({ ...state, setAuth, resetAuth, login, signup, logout }), [state])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}