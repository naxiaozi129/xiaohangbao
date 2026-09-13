import { useMemo, useState } from 'react'
import { GlassButton, GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import { useApp } from '../context'
import { QUIZZES } from '../data/quizzes'
import type { Difficulty, QuizQuestion } from '../types'

const LABELS: Record<Difficulty, string> = { 1: '★ 轻松入门', 2: '★★ 加油思考', 3: '★★★ 小小挑战' }

const PRAISE = ['太棒了！', '完全正确！', '你的小宇宙亮了一下！', '答得真清楚！']
const CHEER = ['差一点点，我们一起看解释。', '没关系，好奇比一次答对更重要。', '这个坑很多人都会踩，你已经更聪明了。']

function pickSet(level: Difficulty, n = 5): QuizQuestion[] {
  const pool = QUIZZES.filter((q) => q.difficulty === level)
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}

export function Quiz() {
  const { addHistory, addStars, addBadge, markQuiz } = useApp()
  const [level, setLevel] = useState<Difficulty | null>(null)
  const [set, setSet] = useState<QuizQuestion[]>([])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = set[i]
  const praise = useMemo(() => PRAISE[i % PRAISE.length], [i])
  const cheer = useMemo(() => CHEER[i % CHEER.length], [i])

  function start(lv: Difficulty) {
    setLevel(lv)
    setSet(pickSet(lv))
    setI(0)
    setPicked(null)
    setScore(0)
    setDone(false)
  }

  function choose(opt: number) {
    if (picked !== null || !q) return
    setPicked(opt)
    const ok = opt === q.answer
    markQuiz(ok)
    if (ok) {
      setScore((s) => s + 1)
      addStars(q.difficulty)
    }
  }

  function next() {
    if (!q || picked === null) return
    if (i + 1 >= set.length) {
      const finalScore = score
      setDone(true)
      addHistory('quiz', `${LABELS[level!]} 完成`, `答对 ${finalScore}/${set.length}`)
      if (finalScore === set.length) addBadge(`${LABELS[level!]} 全对`)
      if (finalScore >= 4) addBadge('闯关小能手')
      return
    }
    setI((n) => n + 1)
    setPicked(null)
  }

  if (!level) {
    return (
      <div className="space-y-4">
        <GlassCard className="px-5 py-6">
          <h2 className="font-display text-2xl text-sky-950">选一个星星难度</h2>
          <p className="mt-2 text-sm leading-7 text-sky-900">
            每关 5 题，有选择题和判断题。答对会点亮星星，全对还能得到徽章。错了也有温暖的讲解。
          </p>
        </GlassCard>
        <div className="grid gap-3 sm:grid-cols-3">
          {([1, 2, 3] as Difficulty[]).map((lv) => (
            <GlassButton key={lv} className="p-5 text-center" onClick={() => start(lv)}>
              <span className="block font-display text-xl text-sky-950">{LABELS[lv]}</span>
              <span className="mt-2 block text-xs text-sky-800">答对一题 +{lv} 星</span>
            </GlassButton>
          ))}
        </div>
      </div>
    )
  }

  if (!q && !done) {
    return (
      <GlassCard className="px-6 py-8 text-center text-sm text-sky-900">
        这一关的题目还在整队，先换个难度试试。
        <div className="mt-4">
          <GlassButton className="px-5 text-sm" onClick={() => setLevel(null)}>
            返回选关
          </GlassButton>
        </div>
      </GlassCard>
    )
  }

  if (done) {
    return (
      <GlassCard className="px-6 py-10 text-center">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-white/70">
          <Icon name="badge" />
        </div>
        <h2 className="font-display text-2xl text-sky-950">本关结束啦</h2>
        <p className="mt-3 text-sky-900">
          你答对了 {score}/{set.length} 题，真为你高兴！
        </p>
        <p className="mt-2 text-sm text-sky-800">星星已经收进探索记录里，随时可以再闯一关。</p>
        <div className="mt-6 flex justify-center gap-3">
          <GlassButton className="px-5 text-sm" onClick={() => start(level)}>
            再来一次
          </GlassButton>
          <GlassButton className="px-5 text-sm" onClick={() => setLevel(null)}>
            换难度
          </GlassButton>
        </div>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-white/90">
        <span>{LABELS[level]}</span>
        <span>
          {i + 1}/{set.length} · 当前 {score} 分
        </span>
      </div>
      <GlassCard className="px-5 py-6">
        <p className="text-xs text-sky-700">{q.type === 'tf' ? '判断题' : '选择题'}</p>
        <h2 className="mt-2 text-lg font-bold leading-8 text-sky-950">{q.question}</h2>
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, idx) => {
            const show = picked !== null
            const right = idx === q.answer
            const mine = idx === picked
            let extra = 'bg-white/70 text-sky-950'
            if (show && right) extra = 'bg-gradient-to-r from-mint to-sky text-sky-950'
            else if (show && mine && !right) extra = 'bg-iris/30 text-sky-950'
            return (
              <button
                key={opt}
                onClick={() => choose(idx)}
                className={`rounded-2xl px-4 py-3 text-left text-sm transition ${extra}`}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {picked !== null && (
          <div className="mt-5 rounded-2xl bg-white/70 px-4 py-3 text-sm leading-7 text-sky-900">
            <p className="font-bold">{picked === q.answer ? praise : cheer}</p>
            <p className="mt-1">{q.explain}</p>
          </div>
        )}
      </GlassCard>
      {picked !== null && (
        <div className="flex justify-end">
          <GlassButton className="bg-gradient-to-r from-mint/80 to-sky/80 px-5 text-sm font-bold" onClick={next}>
            {i + 1 >= set.length ? '看成绩' : '下一题'}
          </GlassButton>
        </div>
      )}
    </div>
  )
}
