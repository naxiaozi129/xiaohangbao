import { useState } from 'react'
import { GlassButton, GlassCard } from '../components/GlassCard'
import { Icon, type IconName } from '../components/Icon'
import { useApp } from '../context'
import { MAP_TOPICS } from '../data/mapTopics'

const ICONS: Record<string, IconName> = {
  sun: 'sun',
  earth: 'earth',
  moon: 'moon',
  rocket: 'rocket',
  satellite: 'satellite',
  station: 'station',
  mars: 'mars',
}

export function KnowledgeMap() {
  const { addHistory, markMap, progress, simpleMode } = useApp()
  const [id, setId] = useState('earth')
  const topic = MAP_TOPICS.find((t) => t.id === id) ?? MAP_TOPICS[1]

  function open(next: string) {
    setId(next)
    const t = MAP_TOPICS.find((x) => x.id === next)
    if (!t) return
    markMap(t.id)
    addHistory('map', t.name, t.intro)
  }

  return (
    <div className="space-y-4">
      <GlassCard className="px-5 py-5">
        <h2 className="font-display text-2xl text-sky-950">点亮一张航天地图</h2>
        <p className="mt-2 text-sm text-sky-900">太阳、地球、月球、火箭、卫星、空间站、火星——点哪里，就讲哪里。</p>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-7">
          {MAP_TOPICS.map((t) => {
            const on = t.id === id
            const seen = progress.mapTopics.includes(t.id)
            return (
              <button
                key={t.id}
                onClick={() => open(t.id)}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-xs ${
                  on ? 'bg-gradient-to-b from-mint to-sky text-sky-950' : 'bg-white/70 text-sky-900'
                }`}
              >
                <Icon name={ICONS[t.id]} size={26} />
                <span className="font-medium">{t.name}</span>
                {seen && <span className="text-[10px] text-sky-700">已探索</span>}
              </button>
            )
          })}
        </div>
      </GlassCard>

      <GlassCard className="px-6 py-6">
        <p className="text-xs tracking-widest text-sky-700">{topic.tag}</p>
        <h3 className="mt-1 font-display text-2xl text-sky-950">{topic.name}</h3>
        <p className="mt-3 text-sm leading-7 text-sky-900">{topic.intro}</p>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-sky-900">
          {(simpleMode ? topic.points.slice(0, 2) : topic.points).map((p) => (
            <li key={p} className="rounded-2xl bg-white/70 px-4 py-2">
              {p}
            </li>
          ))}
        </ul>
      </GlassCard>

      <div className="flex justify-end">
        <GlassButton
          className="px-4 text-sm"
          onClick={() => {
            const i = MAP_TOPICS.findIndex((t) => t.id === id)
            open(MAP_TOPICS[(i + 1) % MAP_TOPICS.length].id)
          }}
        >
          下一个邻居
        </GlassButton>
      </div>
    </div>
  )
}
