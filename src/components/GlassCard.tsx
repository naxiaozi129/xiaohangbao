import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export function GlassCard({
  children,
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`glass rounded-3xl ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function GlassButton({
  children,
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={`glass rounded-2xl px-4 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-glass disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
