import { useEffect, useState } from 'react'
import './App.css'

const API_URL = '/api/steam/global-stats'

function App() {
  const [status, setStatus] = useState('API-data ophalen...')

  useEffect(() => {
    async function fetchSteamData() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        console.log('Steam API data:', data)
        setStatus('Steam API-data opgehaald. Bekijk de browserconsole.')
      } catch (error) {
        console.error('Fout bij ophalen van Steam API-data:', error)
        setStatus('Steam API-data ophalen is mislukt. Bekijk de browserconsole.')
      }
    }

    fetchSteamData()
  }, [])

  return (
    <main className="app">
      <section className="intro">
        <p className="eyebrow">React hello world app</p>
        <h1>Hello world</h1>
        <p>{status}</p>
      </section>
    </main>
  )
}

export default App
