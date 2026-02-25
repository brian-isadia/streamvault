import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

interface AdminNavItemProps {
  to: string
  icon: LucideIcon
  label: string
}

export function AdminNavItem({ to, icon: Icon, label }: AdminNavItemProps) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'bg-surface text-foreground border-l-[3px] border-brand',
      }}
      inactiveProps={{
        className: 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground border-l-[3px] border-transparent',
      }}
      className="flex items-center gap-3 p-3 transition-colors duration-200"
    >
      <Icon className="w-5 h-5" />
      <span className="text-body font-medium">{label}</span>
    </Link>
  )
}
