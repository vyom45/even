import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../auth/ProtectedRoute'
import { LoginPage } from '../pages/auth/Login'
import { ROLES, roleHome } from '../utils/constants'
import {
  AdminDashboard,
  AdminEventsPage,
  AdminLayout,
  AdminSalesReportsPage,
  InventoryListPage,
  PassLotsPage,
} from '../pages/admin/AdminGarbaPages'
import {
  CustomerBuyPage,
  CustomerHomePage,
  CustomerLayout,
  MyOrdersPage,
  MyTicketsPage,
  TicketDetailPage,
} from '../pages/customer/CustomerPages'
import {
  ScannerHistoryPage,
  ScannerHomePage,
  ScannerLayout,
} from '../pages/scanner/ScannerPages'
import { Button } from '../components/ui/Button'
import { useAuth } from '../auth/useAuth'

function UnauthorizedPage() {
  const { user, logout } = useAuth()
  return (
    <div className="page-container flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="section-title">Unauthorized</h1>
      <div className="mt-6 flex gap-2">
        {user && <Button onClick={() => (window.location.href = roleHome[user.role])}>Go home</Button>}
        <Button variant="outline" onClick={() => { logout(); window.location.href = '/login' }}>Logout</Button>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="pass-lots" element={<PassLotsPage />} />
          <Route path="inventory" element={<InventoryListPage />} />
          <Route path="reports" element={<AdminSalesReportsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
        <Route element={<CustomerLayout />}>
          <Route path="/app" element={<CustomerHomePage />} />
          <Route path="/app/events/:id" element={<CustomerBuyPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="/my-tickets/:id" element={<TicketDetailPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.SCANNER]} />}>
        <Route path="/scanner" element={<ScannerLayout />}>
          <Route index element={<ScannerHomePage />} />
          <Route path="history" element={<ScannerHistoryPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
