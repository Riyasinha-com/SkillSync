import type { ReactNode } from 'react'

export function ResourceScrollRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
      {children}
    </div>
  )
}
