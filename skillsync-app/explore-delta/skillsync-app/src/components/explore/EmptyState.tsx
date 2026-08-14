import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
        <div className="relative w-20 h-20 rounded-full glass-panel-raised flex items-center justify-center">
          <SearchX className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-on-surface mb-2">
        No matching skills found
      </h3>
      <p className="text-sm text-on-surface-variant max-w-sm mb-6">
        Try another search or browse different categories.
      </p>
      <Button variant="glass" size="sm" onClick={onReset}>
        Clear filters
      </Button>
    </div>
  )
}
