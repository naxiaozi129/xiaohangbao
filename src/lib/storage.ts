import type { Grade, HistoryEntry, Progress } from '../types'

const KEYS = {
  grade: 'xhb-grade',
  simple: 'xhb-simple-mode',
  history: 'xhb-history',
  progress: 'xhb-progress',
}

const DEFAULT_PROGRESS: Progress = {
  stars: 0,
  badges: [],
  quizCorrect: 0,
  quizTotal: 0,
  storiesRead: [],
  factsSeen: [],
  mapTopics: [],
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function loadGrade(): Grade {
  const n = Number(localStorage.getItem(KEYS.grade) ?? '3')
  if (n >= 1 && n <= 6) return n as Grade
  return 3
}

export function saveGrade(grade: Grade) {
  localStorage.setItem(KEYS.grade, String(grade))
}

export function loadSimpleMode(): boolean {
  return localStorage.getItem(KEYS.simple) === '1'
}

export function saveSimpleMode(on: boolean) {
  localStorage.setItem(KEYS.simple, on ? '1' : '0')
}

export function loadHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>(KEYS.history, [])
}

export function saveHistory(list: HistoryEntry[]) {
  localStorage.setItem(KEYS.history, JSON.stringify(list.slice(0, 80)))
}

export function loadProgress(): Progress {
  return { ...DEFAULT_PROGRESS, ...read<Progress>(KEYS.progress, DEFAULT_PROGRESS) }
}

export function saveProgress(p: Progress) {
  localStorage.setItem(KEYS.progress, JSON.stringify(p))
}

export function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
