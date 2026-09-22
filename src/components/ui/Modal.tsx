import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../utils/format'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  /** Higher layer for nested popups (default 80). */
  layer?: number
  closeOnEscape?: boolean
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  layer = 80,
  closeOnEscape = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (!closeOnEscape) return
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const lockScroll = layer <= 80
    if (lockScroll) document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      if (lockScroll) document.body.style.overflow = ''
    }
  }, [open, onClose, closeOnEscape, layer])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ zIndex: layer }}
    >
      <button
        type="button"
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 max-h-[90vh] w-full overflow-auto rounded-t-2xl bg-white shadow-card animate-slide-up sm:rounded-2xl',
          size === 'sm' && 'sm:max-w-md',
          size === 'md' && 'sm:max-w-lg',
          size === 'lg' && 'sm:max-w-2xl',
        )}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="flex flex-wrap justify-end gap-2 border-t border-ink-100 px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
