import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Role } from '../types'
import { currentUserSeed } from '../data/mock'

interface RoleContextValue {
  role: Role
  setRole: (role: Role) => void
  demoUser: typeof currentUserSeed
  isAuthenticated: boolean
  setAuthenticated: (v: boolean) => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

const STORAGE_KEY = 'eventbiz-demo-role'
const AUTH_KEY = 'eventbiz-demo-auth'

function readRole(): Role {
  const stored = localStorage.getItem(STORAGE_KEY) as Role | null
  return stored ?? 'customer'
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(readRole)
  const [isAuthenticated, setAuthenticatedState] = useState(
    () => localStorage.getItem(AUTH_KEY) === '1',
  )

  const setRole = (next: Role) => {
    setRoleState(next)
    localStorage.setItem(STORAGE_KEY, next)
    if (next !== 'customer') {
      setAuthenticatedState(true)
      localStorage.setItem(AUTH_KEY, '1')
    }
  }

  const setAuthenticated = (v: boolean) => {
    setAuthenticatedState(v)
    localStorage.setItem(AUTH_KEY, v ? '1' : '0')
  }

  const value = useMemo(
    () => ({
      role,
      setRole,
      demoUser: currentUserSeed,
      isAuthenticated,
      setAuthenticated,
    }),
    [role, isAuthenticated],
  )

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}

export const roleHome: Record<Role, string> = {
  customer: '/',
  partner: '/partner/dashboard',
  organizer: '/organizer/dashboard',
  gate: '/gate/scanner',
  admin: '/admin/dashboard',
}

export const roleLabels: Record<Role, string> = {
  customer: 'Customer',
  partner: 'Partner',
  organizer: 'Organizer',
  gate: 'Gate Operator',
  admin: 'Admin',
}
