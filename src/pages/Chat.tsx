import { useEffect, useRef, useState } from 'react'
import { GlassButton, GlassCard } from '../components/GlassCard'
import { Mascot } from '../components/Mascot'
import { useApp } from '../context'
import { SHORTCUTS } from '../data/qa'
import { answerQuestion } from '../lib/qaEngine'
import { makeId } from '../lib/storage'
import type { ChatMessage } from '../types'

export function Chat() {
  const { grade, simpleMode, addHistory } = useApp()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'hello',
      role: 'bao',
      text: simpleMode
        ? '我是小航宝。你可以问我火箭、月亮、宇航员的事情。'
        : '你好呀，我是小航宝。把你的问题轻轻放过来，我会先给短答案，再用生活里的比方帮你记住。',
    },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function ask(text: string) {
    const q = text.trim()
    if (!q) return
    const reply = answerQuestion(q, grade, simpleMode)
    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: 'kid', text: q },
      { id: makeId(), role: 'bao', text: reply },
    ])
    addHistory('chat', q, reply.slice(0, 80))
    setInput('')
  }

  return (
    <div className="flex min-h-[70vh] flex-col gap-4">
      <GlassCard className="flex items-center gap-3 px-4 py-3">
        <Mascot size={72} />
        <p className="text-sm text-sky-900">
          回答结构：短答案 → 比方 → 例子 → 接着问一句。想不出来时，我会诚实地说还不能确定。
        </p>
      </GlassCard>

      <div className="flex flex-1 flex-col gap-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'kid' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[90%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-7 shadow-glass sm:max-w-[80%] ${
                m.role === 'kid'
                  ? 'bg-gradient-to-r from-mint to-sky text-sky-950'
                  : 'glass text-sky-950'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex flex-wrap gap-2">
        {SHORTCUTS.map((s) => (
          <GlassButton key={s} className="px-3 py-2 text-sm text-sky-950" onClick={() => ask(s)}>
            {s}
          </GlassButton>
        ))}
      </div>

      <form
        className="glass flex items-end gap-2 rounded-3xl p-2"
        onSubmit={(e) => {
          e.preventDefault()
          ask(input)
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          placeholder="写下你的航天问题…"
          className="min-h-[52px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-sky-950 outline-none placeholder:text-sky-800/50"
        />
        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-mint to-sky px-4 py-3 text-sm font-bold text-sky-950"
        >
          发送
        </button>
      </form>
    </div>
  )
}
