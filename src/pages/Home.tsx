import { EntryIcon } from '../components/Shell'
import { GlassButton, GlassCard } from '../components/GlassCard'
import { Mascot } from '../components/Mascot'
import { useApp } from '../context'
import type { Grade, View } from '../types'
import type { IconName } from '../components/Icon'

const ENTRIES: { view: View; title: string; desc: string; icon: IconName }[] = [
  { view: 'chat', title: '开始提问', desc: '把好奇交给小航宝', icon: 'chat' },
  { view: 'quiz', title: '航天闯关', desc: '星星徽章等你收集', icon: 'quiz' },
  { view: 'stories', title: '航天故事', desc: '第一人称冒险续写', icon: 'story' },
  { view: 'facts', title: '今日冷知识', desc: '短短一条，记得住', icon: 'fact' },
  { view: 'map', title: '知识地图', desc: '点亮太阳到火星', icon: 'map' },
  { view: 'history', title: '我的探索记录', desc: '看看自己走了多远', icon: 'history' },
]

export function Home() {
  const { grade, setGrade, navigate, progress, simpleMode } = useApp()

  return (
    <div className="space-y-6">
      <GlassCard className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <Mascot size={150} />
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-sky-700">启智·融趣——航天知识智能体</p>
            <h1 className="mt-1 font-display text-3xl text-sky-950 sm:text-4xl">你好，我是小航宝</h1>
            <p className="mt-3 text-sm leading-7 text-sky-900/90 sm:text-base">
              {simpleMode
                ? '选一个年级，我们用更短、更好懂的话，一起看星星。'
                : '这里是给小学 1–6 年级的航天乐园。先选年级，我会用适合你的话说宇宙的故事。'}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="text-xs text-sky-800">我的年级</span>
              {([1, 2, 3, 4, 5, 6] as Grade[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`h-9 min-w-9 rounded-full px-3 text-sm font-medium transition ${
                    grade === g
                      ? 'bg-gradient-to-r from-mint to-sky text-sky-950 shadow-glass'
                      : 'bg-white/70 text-sky-800 hover:bg-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-sky-800/80">
              已点亮 {progress.stars} 颗星 · 徽章 {progress.badges.length} 枚
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-3 sm:grid-cols-2">
        {ENTRIES.map((item) => (
          <GlassButton key={item.view} onClick={() => navigate(item.view)} className="flex items-center gap-4 p-4">
            <EntryIcon name={item.icon} />
            <span>
              <span className="block text-base font-bold text-sky-950">{item.title}</span>
              <span className="mt-0.5 block text-sm text-sky-800/80">{item.desc}</span>
            </span>
          </GlassButton>
        ))}
      </div>
    </div>
  )
}
