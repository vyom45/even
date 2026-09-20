import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Ticket } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { DEMO_ACCOUNTS, roleHome, ROLE_LABELS } from '../../utils/constants'

export function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('customer@demo.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated && user) {
    return <Navigate to={roleHome[user.role]} replace />
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const u = await login(email, password)
      navigate(roleHome[u.role])
    } catch {
      setError('Invalid credentials. Use Admin / Customer / Scanner below.')
    } finally {
      setLoading(false)
    }
  }

  const quickLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError('')
    setLoading(true)
    try {
      const u = await login(demoEmail, demoPassword)
      navigate(roleHome[u.role])
    } catch {
      setError('API not reachable. Run npm run dev (Vite + json-server).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-hero-mesh">
      <div className="page-container flex flex-1 items-center justify-center py-12">
        <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-2">
          <div className="hidden flex-col justify-center lg:flex">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white">
              <Ticket className="h-6 w-6" />
            </div>
            <p className="font-display text-4xl font-extrabold text-ink-950">
              Event<span className="text-brand-700">Biz</span>
            </p>
            <h1 className="mt-3 font-display text-2xl font-bold text-ink-800">
              Sell & scan Garba passes
            </h1>
            <p className="mt-3 text-ink-600">
              <strong>Admin</strong> lists inventory → <strong>Customer</strong> buys QR passes →{' '}
              <strong>Scanner</strong> verifies entry at the gate.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="space-y-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900">Sign in</h2>
              <p className="mt-1 text-sm text-ink-500">
                Demo mode — password not checked. Use quick login or any email below.
              </p>
            </div>
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Optional — not verified"
            />
            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>
            )}
            <Button type="submit" className="w-full" loading={loading}>
              Sign in
            </Button>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">Quick login</p>
              <div className="flex flex-wrap gap-2">
                {DEMO_ACCOUNTS.map((a) => (
                  <button
                    key={a.email}
                    type="button"
                    disabled={loading}
                    onClick={() => quickLogin(a.email, a.password)}
                    className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800"
                  >
                    {ROLE_LABELS[a.role]}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
