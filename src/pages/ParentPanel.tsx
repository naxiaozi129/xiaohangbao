import { GlassCard } from '../components/GlassCard'
import { useApp } from '../context'
import { PAPER_ROCKET_LESSON } from '../data/lesson'

export function ParentPanel() {
  const { simpleMode, setSimpleMode, grade } = useApp()
  const lesson = PAPER_ROCKET_LESSON

  return (
    <div className="space-y-4">
      <GlassCard className="px-5 py-6">
        <h2 className="font-display text-2xl text-sky-950">给家长与老师的小面板</h2>
        <p className="mt-2 text-sm leading-7 text-sky-900">
          这是纯前端乐园，不采集账号，不调用外部大模型，问答都在本地完成。当前孩子年级：{grade} 年级。
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => setSimpleMode(true)}
            className={`rounded-2xl px-4 py-4 text-left ${simpleMode ? 'bg-gradient-to-r from-mint to-sky' : 'bg-white/70'}`}
          >
            <p className="font-bold text-sky-950">简明模式</p>
            <p className="mt-1 text-xs leading-6 text-sky-800">句子更短、一次少看一点，适合低年级或阅读刚刚起步的孩子。</p>
          </button>
          <button
            onClick={() => setSimpleMode(false)}
            className={`rounded-2xl px-4 py-4 text-left ${!simpleMode ? 'bg-gradient-to-r from-mint to-sky' : 'bg-white/70'}`}
          >
            <p className="font-bold text-sky-950">普通模式</p>
            <p className="mt-1 text-xs leading-6 text-sky-800">保留短答、比方、例子和追问，适合中高年级一起精读。</p>
          </button>
        </div>
      </GlassCard>

      <GlassCard className="px-5 py-6">
        <h3 className="font-display text-xl text-sky-950">{lesson.title}</h3>
        <p className="mt-2 text-sm leading-7 text-sky-900">课堂目标：{lesson.goal}</p>

        <Section title="材料" items={lesson.materials} />
        <Section title="步骤" items={lesson.steps} numbered />
        <Section title="科学要点" items={lesson.science} />
        <Section title="讨论" items={lesson.discuss} />
        <Section title="安全" items={lesson.safety} />
      </GlassCard>
    </div>
  )
}

function Section({ title, items, numbered }: { title: string; items: string[]; numbered?: boolean }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-sky-950">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm leading-7 text-sky-900">
        {items.map((x, i) => (
          <li key={x} className="rounded-2xl bg-white/70 px-3 py-2">
            {numbered ? `${i + 1}. ${x}` : x}
          </li>
        ))}
      </ul>
    </div>
  )
}
