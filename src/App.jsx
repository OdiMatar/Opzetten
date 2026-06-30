import './App.css'
import { Layout } from './components/Layout.jsx'
import { GameProvider } from './GameContext.jsx'

function App() {
  return (
    <GameProvider>
      <Layout />
    </GameProvider>
  )
}

export default App
