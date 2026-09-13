import { AppProvider, useApp } from './context'
import { Shell } from './components/Shell'
import { Starfield } from './components/Starfield'
import { Chat } from './pages/Chat'
import { Facts } from './pages/Facts'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { KnowledgeMap } from './pages/KnowledgeMap'
import { ParentPanel } from './pages/ParentPanel'
import { Quiz } from './pages/Quiz'
import { Stories } from './pages/Stories'

function Screen() {
  const { view } = useApp()
  return (
    <Shell>
      {view === 'home' && <Home />}
      {view === 'chat' && <Chat />}
      {view === 'facts' && <Facts />}
      {view === 'quiz' && <Quiz />}
      {view === 'stories' && <Stories />}
      {view === 'map' && <KnowledgeMap />}
      {view === 'history' && <History />}
      {view === 'parent' && <ParentPanel />}
    </Shell>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Starfield />
      <Screen />
    </AppProvider>
  )
}
