import { GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import { useApp } from '../context'
import type { HistoryKind } from '../types'

const KIND_LABEL: Record<HistoryKind, string> = {
  chat: '问答',
  quiz: '闯关',
  story: '故事',
  fact: '冷知识',
  map: '地图',
}

export function History() {
  const { history, progress } = useApp()

  return (
    <div className="space-y-4">
      <GlassCard className="grid grid-cols-2 gap-3 px-5 py-5 sm:grid-cols-4">
        <Stat label="星星" value={progress.stars} icon="star" />
        <Stat label="徽章" value={progress.badges.length} icon="badge" />
        <Stat label="闯关答题" value={`${progress.quizCorrect}/${progress.quizTotal}`} icon="quiz" />
        <Stat label="记录条数" value={history.length} icon="history" />
      </GlassCard>

      {progress.badges.length > 0 && (
        <GlassCard className="px-5 py-4">
          <p className="text-sm font-bold text-sky-950">徽章墙</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {progress.badges.map((b) => (
              <span key={b} className="rounded-full bg-gradient-to-r from-mint to-sky px-3 py-1 text-xs text-sky-950">
                {b}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      <div className="space-y-2">
        {history.length === 0 && (
          <GlassCard className="px-5 py-8 text-center text-sm text-sky-900">
            还没有记录。去问一个问题，或点亮知识地图的第一站吧。
          </GlassCard>
        )}
        {history.map((h) => (
          <GlassCard key={h.id} className="px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-sky-950">{h.title}</p>
              <span className="shrink-0 rounded-full bg-white/80 px-2 py-0.5 text-[11px] text-sky-800">
                {KIND_LABEL[h.kind]}
              </span>
            </div>
            {h.detail && <p className="mt-1 line-clamp-2 text-xs leading-6 text-sky-800">{h.detail}</p>}
            <p className="mt-1 text-[11px] text-sky-700/80">{new Date(h.at).toLocaleString('zh-CN')}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: number | string
  icon: 'star' | 'badge' | 'quiz' | 'history'
}) {
  return (
    <div className="rounded-2xl bg-white/70 px-3 py-3 text-center">
      <div className="mx-auto grid h-9 w-9 place-items-center">
        <Icon name={icon} size={22} />
      </div>
      <p className="mt-1 text-lg font-bold text-sky-950">{value}</p>
      <p className="text-xs text-sky-800">{label}</p>
    </div>
  )
}
