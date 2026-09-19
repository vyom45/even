import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useRole } from '../../contexts/RoleContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { setAuthenticated } = useRole()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('aarav.patel@email.com')
  const [password, setPassword] = useState('demo1234')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setAuthenticated(true)
    setLoading(false)
    navigate('/account')
  }

  return (
    <div className="page-container flex justify-center py-12 sm:py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8 animate-slide-up"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Demo login — any credentials work.</p>
        </div>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" loading={loading}>
          Sign in
        </Button>
        <p className="text-center text-sm text-ink-500">
          New here?{' '}
          <button type="button" onClick={() => navigate('/register')} className="font-semibold text-brand-700">
            Create account
          </button>
        </p>
      </form>
    </div>
  )
}

export function RegisterPage() {
  const navigate = useNavigate()
  const { setAuthenticated } = useRole()
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setAuthenticated(true)
    setLoading(false)
    navigate('/account')
  }

  return (
    <div className="page-container flex justify-center py-12 sm:py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8 animate-slide-up"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Create account</h1>
          <p className="mt-1 text-sm text-ink-500">Frontend-only — nothing is stored on a server.</p>
        </div>
        <Input label="Full name" placeholder="Your name" required />
        <Input label="Email" type="email" placeholder="you@email.com" required />
        <Input label="Phone" type="tel" placeholder="+91 …" required />
        <Input label="Password" type="password" required />
        <Button type="submit" className="w-full" loading={loading}>
          Register
        </Button>
        <p className="text-center text-sm text-ink-500">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="font-semibold text-brand-700">
            Log in
          </button>
        </p>
      </form>
    </div>
  )
}
