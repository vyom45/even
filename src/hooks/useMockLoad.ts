import { useEffect, useState } from 'react'
import { delay } from '../utils/format'

export function useMockLoad<T>(loader: () => T, ms = 600) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const reload = () => {
    setLoading(true)
    setError(false)
    delay(ms)
      .then(() => {
        // Demo: tiny chance of simulated error can be forced via session flag
        if (sessionStorage.getItem('eventbiz-force-error') === '1') {
          setError(true)
          setData(null)
        } else {
          setData(loader())
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error, reload }
}
