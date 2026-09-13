import { useMemo, useState } from 'react'
import { GlassButton, GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import { useApp } from '../context'
import { FACTS } from '../data/facts'

function todayIndex() {
  const d = new Date()
  const key = d.getFullYear() * 400 + (d.getMonth() + 1) * 31 + d.getDate()
  return key % FACTS.length
}

export function Facts() {
  const { addHistory, markFact, simpleMode } = useApp()
  const start = useMemo(() => todayIndex(), [])
  const [idx, setIdx] = useState(start)
  const fact = FACTS[idx]

  function reveal(next: number) {
    const f = FACTS[(next + FACTS.length) % FACTS.length]
    setIdx((next + FACTS.length) % FACTS.length)
    markFact(f.id)
    addHistory('fact', f.title, f.text)
  }

  return (
    <div className="space-y-4">
      <GlassCard className="px-6 py-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/70">
          <Icon name="fact" />
        </div>
        <p className="text-xs tracking-widest text-sky-700">今日航天冷知识 · {idx + 1}/{FACTS.length}</p>
        <h2 className="mt-2 font-display text-2xl text-sky-950">{fact.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-sky-900 sm:text-base">
          {simpleMode ? fact.text.split('，')[0] + '。' : fact.text}
        </p>
      </GlassCard>
      <div className="flex flex-wrap justify-center gap-3">
        <GlassButton className="px-5 text-sm text-sky-950" onClick={() => reveal(idx - 1)}>
          上一条
        </GlassButton>
        <GlassButton
          className="bg-gradient-to-r from-mint/80 to-sky/80 px-5 text-sm font-bold text-sky-950"
          onClick={() => reveal(idx + 1)}
        >
          再看一条
        </GlassButton>
      </div>
      <p className="text-center text-xs text-white/85">知识池共 {FACTS.length} 条，都是短而靠谱的航天小事实。</p>
    </div>
  )
}
