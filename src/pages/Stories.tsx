import { useState } from 'react'
import { GlassButton, GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import { useApp } from '../context'
import { STORIES } from '../data/stories'
import type { IconName } from '../components/Icon'

const ICONS: Record<string, IconName> = {
  astronaut: 'station',
  designer: 'rocket',
  rover: 'moon',
  scientist: 'satellite',
  mars: 'mars',
}

export function Stories() {
  const { addHistory, markStory, simpleMode } = useApp()
  const [sid, setSid] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const story = STORIES.find((s) => s.id === sid)

  function open(id: string) {
    setSid(id)
    setPage(0)
  }

  function next() {
    if (!story) return
    if (page + 1 >= story.pages.length) {
      markStory(story.id)
      addHistory('story', story.title, '读完了一则第一人称故事')
      setSid(null)
      setPage(0)
      return
    }
    setPage((p) => p + 1)
  }

  if (!story) {
    return (
      <div className="space-y-4">
        <GlassCard className="px-5 py-6">
          <h2 className="font-display text-2xl text-sky-950">点开故事，轻轻往下走</h2>
          <p className="mt-2 text-sm leading-7 text-sky-900">
            每一则都是“我”的冒险。点一下，再点一下，故事就会继续。
          </p>
        </GlassCard>
        <div className="grid gap-3 sm:grid-cols-2">
          {STORIES.map((s) => (
            <GlassButton key={s.id} className="flex items-start gap-3 p-4" onClick={() => open(s.id)}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70">
                <Icon name={ICONS[s.id] ?? 'story'} />
              </span>
              <span>
                <span className="block font-bold text-sky-950">{s.title}</span>
                <span className="mt-1 block text-sm text-sky-800/90">{s.summary}</span>
              </span>
            </GlassButton>
          ))}
        </div>
      </div>
    )
  }

  const text = simpleMode ? story.pages[page].text.split('。').slice(0, 2).join('。') + '。' : story.pages[page].text

  return (
    <div className="space-y-4">
      <GlassCard className="min-h-[280px] px-6 py-8">
        <p className="text-xs text-sky-700">
          {story.role} · {page + 1}/{story.pages.length}
        </p>
        <h2 className="mt-1 font-display text-2xl text-sky-950">{story.title}</h2>
        <p className="mt-6 text-base leading-9 text-sky-950">{text}</p>
      </GlassCard>
      <div className="flex justify-between">
        <GlassButton className="px-4 text-sm" onClick={() => setSid(null)}>
          换一个故事
        </GlassButton>
        <GlassButton className="bg-gradient-to-r from-mint/80 to-sky/80 px-5 text-sm font-bold" onClick={next}>
          {page + 1 >= story.pages.length ? '读完啦' : '点我继续'}
        </GlassButton>
      </div>
    </div>
  )
}
