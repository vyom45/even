import { Outlet } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { MobileNavStrip, Sidebar } from '../components/layout/Sidebar'
import { RoleSwitcher } from '../components/layout/RoleSwitcher'

export function DashboardLayout({
  title,
  items,
}: {
  title: string
  items: { to: string; label: string; icon: LucideIcon }[]
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Navbar />
      <div className="page-container flex flex-1 gap-6 py-6">
        <Sidebar title={title} items={items} />
        <div className="min-w-0 flex-1">
          <MobileNavStrip items={items} />
          <Outlet />
        </div>
      </div>
      <RoleSwitcher />
    </div>
  )
}
