export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  SCANNER: 'scanner',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Admin',
  customer: 'Customer',
  scanner: 'Scanner',
}

export const ALLOCATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

export const TICKET_STATUS = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  USED: 'used',
  CANCELLED: 'cancelled',
} as const

export const DEMO_ACCOUNTS = [
  { email: 'admin@demo.com', password: 'demo123', role: ROLES.ADMIN, label: 'Admin' },
  { email: 'customer@demo.com', password: 'demo123', role: ROLES.CUSTOMER, label: 'Customer' },
  { email: 'scanner@demo.com', password: 'demo123', role: ROLES.SCANNER, label: 'Scanner' },
] as const

export const AUTH_STORAGE_KEY = 'garba_auth_user'
export const API_BASE = 'http://localhost:3001'

export const roleHome: Record<Role, string> = {
  admin: '/admin/dashboard',
  customer: '/app',
  scanner: '/scanner',
}
