import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronUp, Sparkles } from 'lucide-react'
import { roleHome, roleLabels, useRole } from '../../contexts/RoleContext'
import type { Role } from '../../types'
import { cn } from '../../utils/format'

const roles: Role[] = ['customer', 'partner', 'organizer', 'gate', 'admin']

export function RoleSwitcher() {
  const { role, setRole } = useRole()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-2 w-[min(100vw-2rem,18rem)] overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card animate-slide-up">
          <div className="border-b border-ink-100 bg-ink-50 px-3 py-2">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Demo Role Switcher</p>
            <p className="text-[11px] text-ink-400">Fake auth — for investor demos</p>
          </div>
          <div className="p-2">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r)
                  setOpen(false)
                  navigate(roleHome[r])
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition',
                  role === r ? 'bg-brand-50 text-brand-800' : 'text-ink-700 hover:bg-ink-50',
                )}
              >
                {roleLabels[r]}
                {role === r && <span className="text-[10px] font-bold uppercase text-brand-600">Active</span>}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-3 text-sm font-bold text-white shadow-card transition hover:bg-ink-800"
      >
        <Sparkles className="h-4 w-4 text-saffron-400" />
        {roleLabels[role]}
        <ChevronUp className={cn('h-4 w-4 transition', open && 'rotate-180')} />
      </button>
    </div>
  )
}
