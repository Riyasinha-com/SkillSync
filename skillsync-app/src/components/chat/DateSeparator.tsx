export function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-white/8" />
      <span className="text-[11px] font-mono-label text-on-surface-variant/50">{label}</span>
      <div className="h-px flex-1 bg-white/8" />
    </div>
  )
}
