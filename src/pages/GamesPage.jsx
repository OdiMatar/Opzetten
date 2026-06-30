import { GameFilters } from '../components/GameFilters.jsx'
import { GameResults } from '../components/GameResults.jsx'
import { GameSearchForm } from '../components/GameSearchForm.jsx'
import { useGameContext } from '../useGameContext.js'

export function GamesPage() {
  const {
    filteredGames,
    isLoading,
    loadGames,
    minPlayers,
    needsAchievements,
    needsServers,
    query,
    setMinPlayers,
    setNeedsAchievements,
    setNeedsServers,
    setQuery,
    status,
  } = useGameContext()

  function fetchGames(event) {
    event.preventDefault()
    loadGames(query)
  }

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Game overzicht</p>
        <h1>Zoek en filter Steam-games</h1>
        <p>
          Vul een gamenaam in en vergelijk de resultaten op spelers, servers en
          achievements. De filters werken op de huidige lijst, zodat je niet bij
          elke filterwijziging opnieuw hoeft te wachten.
        </p>
      </section>

      <GameSearchForm
        isLoading={isLoading}
        onSearch={fetchGames}
        query={query}
        setQuery={setQuery}
      />
      <GameFilters
        minPlayers={minPlayers}
        needsAchievements={needsAchievements}
        needsServers={needsServers}
        setMinPlayers={setMinPlayers}
        setNeedsAchievements={setNeedsAchievements}
        setNeedsServers={setNeedsServers}
      />

      <p className="status">{status}</p>

      <GameResults filteredGames={filteredGames} isLoading={isLoading} />
    </>
  )
}
