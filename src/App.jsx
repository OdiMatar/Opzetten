import { useEffect, useState } from 'react'
import './App.css'

const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.9&current=temperature_2m,wind_speed_10m'

function App() {
  const [status, setStatus] = useState('API-data ophalen...')

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        console.log('Open-Meteo data:', data)
        setStatus('API-data opgehaald. Bekijk de browserconsole.')
      } catch (error) {
        console.error('Fout bij ophalen van API-data:', error)
        setStatus('API-data ophalen is mislukt. Bekijk de browserconsole.')
      }
    }

    fetchWeatherData()
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
