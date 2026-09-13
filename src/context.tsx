import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Grade, HistoryEntry, HistoryKind, Progress, View } from './types'
import {
  loadGrade,
  loadHistory,
  loadProgress,
  loadSimpleMode,
  makeId,
  saveGrade,
  saveHistory,
  saveProgress,
  saveSimpleMode,
} from './lib/storage'

interface AppCtx {
  view: View
  navigate: (view: View) => void
  grade: Grade
  setGrade: (g: Grade) => void
  simpleMode: boolean
  setSimpleMode: (on: boolean) => void
  history: HistoryEntry[]
  addHistory: (kind: HistoryKind, title: string, detail?: string) => void
  progress: Progress
  addStars: (n: number) => void
  addBadge: (name: string) => void
  markQuiz: (correct: boolean) => void
  markStory: (id: string) => void
  markFact: (id: string) => void
  markMap: (id: string) => void
}

const Ctx = createContext<AppCtx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('home')
  const [grade, setGradeState] = useState<Grade>(loadGrade)
  const [simpleMode, setSimpleState] = useState(loadSimpleMode)
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)
  const [progress, setProgress] = useState<Progress>(loadProgress)

  const value = useMemo<AppCtx>(
    () => ({
      view,
      navigate: setView,
      grade,
      setGrade: (g) => {
        setGradeState(g)
        saveGrade(g)
      },
      simpleMode,
      setSimpleMode: (on) => {
        setSimpleState(on)
        saveSimpleMode(on)
      },
      history,
      addHistory: (kind, title, detail) => {
        const entry: HistoryEntry = { id: makeId(), kind, title, detail, at: Date.now() }
        setHistory((prev) => {
          const next = [entry, ...prev].slice(0, 80)
          saveHistory(next)
          return next
        })
      },
      progress,
      addStars: (n) => {
        setProgress((p) => {
          const next = { ...p, stars: p.stars + n }
          saveProgress(next)
          return next
        })
      },
      addBadge: (name) => {
        setProgress((p) => {
          if (p.badges.includes(name)) return p
          const next = { ...p, badges: [...p.badges, name] }
          saveProgress(next)
          return next
        })
      },
      markQuiz: (correct) => {
        setProgress((p) => {
          const next = {
            ...p,
            quizTotal: p.quizTotal + 1,
            quizCorrect: p.quizCorrect + (correct ? 1 : 0),
          }
          saveProgress(next)
          return next
        })
      },
      markStory: (id) => {
        setProgress((p) => {
          if (p.storiesRead.includes(id)) return p
          const next = { ...p, storiesRead: [...p.storiesRead, id] }
          saveProgress(next)
          return next
        })
      },
      markFact: (id) => {
        setProgress((p) => {
          if (p.factsSeen.includes(id)) return p
          const next = { ...p, factsSeen: [...p.factsSeen, id] }
          saveProgress(next)
          return next
        })
      },
      markMap: (id) => {
        setProgress((p) => {
          if (p.mapTopics.includes(id)) return p
          const next = { ...p, mapTopics: [...p.mapTopics, id] }
          saveProgress(next)
          return next
        })
      },
    }),
    [view, grade, simpleMode, history, progress],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp 必须在 AppProvider 内使用')
  return ctx
}
