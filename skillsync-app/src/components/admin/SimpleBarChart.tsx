import type { MonthlyPoint } from '@/data/adminMock'

export function SimpleBarChart({
  data,
  tint = 'primary',
}: {
  data: MonthlyPoint[]
  tint?: 'primary' | 'tertiary'
}) {
  const max = Math.max(...data.map((d) => d.value))
  const barColor = tint === 'primary' ? 'bg-primary' : 'bg-tertiary'

  return (
    <div className="flex items-end justify-between gap-3 h-40 px-1">
      {data.map((point) => (
        <div key={point.label} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
          <span className="text-[10px] text-on-surface-variant/70">{point.value.toLocaleString()}</span>
          <div
            className={`w-full max-w-8 rounded-t-lg ${barColor} transition-all duration-700 ease-out`}
            style={{ height: `${(point.value / max) * 100}%`, opacity: 0.85 }}
          />
          <span className="text-[11px] font-mono-label text-on-surface-variant/60">{point.label}</span>
        </div>
      ))}
    </div>
  )
}
