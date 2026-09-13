import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import { useApp } from '../context'
import type { View } from '../types'

const TITLES: Record<View, string> = {
  home: '星空探索',
  chat: '航天问答',
  facts: '今日冷知识',
  quiz: '航天闯关',
  stories: '航天故事',
  map: '知识地图',
  history: '探索记录',
  parent: '家长与教师',
}

export function Shell({ children }: { children: ReactNode }) {
  const { view, navigate, grade, simpleMode } = useApp()

  return (
    <div className="relative mx-auto min-h-screen max-w-5xl px-4 pb-16 pt-5 sm:px-6">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {view !== 'home' && (
            <button
              className="glass grid h-11 w-11 place-items-center rounded-2xl"
              onClick={() => navigate('home')}
              aria-label="返回首页"
            >
              <Icon name="back" size={22} />
            </button>
          )}
          <div>
            <p className="font-display text-lg text-white/95 sm:text-xl">小航宝的航天乐园</p>
            <p className="text-xs text-cyan-50/90 sm:text-sm">
              {TITLES[view]} · {grade} 年级{simpleMode ? ' · 简明模式' : ''}
            </p>
          </div>
        </div>
        <button
          className="glass flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-sky-950"
          onClick={() => navigate(view === 'parent' ? 'home' : 'parent')}
        >
          <Icon name="parent" size={22} />
          <span className="hidden sm:inline">家长/教师</span>
        </button>
      </header>
      {children}
    </div>
  )
}

export function EntryIcon({ name }: { name: IconName }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70">
      <Icon name={name} />
    </span>
  )
}
