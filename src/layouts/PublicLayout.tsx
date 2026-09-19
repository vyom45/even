import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { RoleSwitcher } from '../components/layout/RoleSwitcher'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-ink-100 bg-white">
        <div className="page-container flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-sm font-bold text-ink-800">
            Event<span className="text-brand-700">Biz</span>
          </p>
          <p className="text-xs text-ink-500">
            Frontend demo · Ahmedabad Navratri 2025 · No real payments
          </p>
        </div>
      </footer>
      <RoleSwitcher />
    </div>
  )
}
