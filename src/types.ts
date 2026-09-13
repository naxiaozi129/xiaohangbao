export type Grade = 1 | 2 | 3 | 4 | 5 | 6

export type View =
  | 'home'
  | 'chat'
  | 'facts'
  | 'quiz'
  | 'stories'
  | 'map'
  | 'history'
  | 'parent'

export type Difficulty = 1 | 2 | 3

export type HistoryKind = 'chat' | 'quiz' | 'story' | 'fact' | 'map'

export interface HistoryEntry {
  id: string
  kind: HistoryKind
  title: string
  detail?: string
  at: number
}

export interface Progress {
  stars: number
  badges: string[]
  quizCorrect: number
  quizTotal: number
  storiesRead: string[]
  factsSeen: string[]
  mapTopics: string[]
}

export interface ChatMessage {
  id: string
  role: 'bao' | 'kid'
  text: string
}

export interface QuizQuestion {
  id: string
  difficulty: Difficulty
  type: 'choice' | 'tf'
  question: string
  options: string[]
  answer: number
  explain: string
}

export interface StoryPage {
  text: string
}

export interface Story {
  id: string
  title: string
  role: string
  summary: string
  pages: StoryPage[]
}

export interface MapTopic {
  id: string
  name: string
  tag: string
  intro: string
  points: string[]
}

export interface Fact {
  id: string
  title: string
  text: string
}

export interface QaItem {
  keys: string[]
  short: string
  analogy: string
  example: string
  follow: string
}
