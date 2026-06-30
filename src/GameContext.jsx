import { useCallback, useEffect, useMemo, useState } from 'react'
import { GameContext } from './useGameContext.js'

const API_URL = '/api/steam/games'
const DEFAULT_QUERY = 'counter'

export function GameProvider({ children }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [games, setGames] = useState([])
  const [cachedSearches, setCachedSearches] = useState({})
  const [minPlayers, setMinPlayers] = useState(0)
  const [needsServers, setNeedsServers] = useState(false)
  const [needsAchievements, setNeedsAchievements] = useState(false)
  const [status, setStatus] = useState('Steam-games laden...')
  const [isLoading, setIsLoading] = useState(true)

  const loadGames = useCallback(
    async (searchQuery) => {
      const cleanQuery = searchQuery.trim()
      const cacheKey = cleanQuery.toLowerCase()

      if (cleanQuery.length < 2) {
        setGames([])
        setStatus('Typ minstens 2 tekens om te zoeken.')
        return
      }

      if (cachedSearches[cacheKey]) {
        setGames(cachedSearches[cacheKey])
        setStatus(`${cachedSearches[cacheKey].length} games gevonden.`)
        return
      }

      setIsLoading(true)
      setStatus('Steam-data ophalen...')

      try {
        const params = new URLSearchParams({ query: cleanQuery })
        const response = await fetch(`${API_URL}?${params}`)

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        const nextGames = data.games ?? []

        console.log('Steam game search data:', data)
        setGames(nextGames)
        setCachedSearches((currentCache) => ({
          ...currentCache,
          [cacheKey]: nextGames,
        }))
        setStatus(`${nextGames.length} games gevonden.`)
      } catch (error) {
        console.error('Fout bij ophalen van Steam games:', error)
        setStatus('Steam-data ophalen is mislukt. Bekijk de browserconsole.')
      } finally {
        setIsLoading(false)
      }
    },
    [cachedSearches],
  )

  useEffect(() => {
    let isActive = true

    async function loadInitialGames() {
      try {
        const params = new URLSearchParams({ query: DEFAULT_QUERY })
        const response = await fetch(`${API_URL}?${params}`)

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        const nextGames = data.games ?? []

        if (!isActive) {
          return
        }

        console.log('Steam game search data:', data)
        setGames(nextGames)
        setCachedSearches({ [DEFAULT_QUERY]: nextGames })
        setStatus(`${nextGames.length} games gevonden.`)
      } catch (error) {
        if (!isActive) {
          return
        }

        console.error('Fout bij ophalen van Steam games:', error)
        setStatus('Steam-data ophalen is mislukt. Bekijk de browserconsole.')
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadInitialGames()

    return () => {
      isActive = false
    }
  }, [])

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (game.playerCount < minPlayers) {
        return false
      }

      if (needsServers && !game.hasServers) {
        return false
      }

      if (needsAchievements && !game.hasAchievements) {
        return false
      }

      return true
    })
  }, [games, minPlayers, needsAchievements, needsServers])

  const value = useMemo(
    () => ({
      games,
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
    }),
    [
      filteredGames,
      games,
      isLoading,
      loadGames,
      minPlayers,
      needsAchievements,
      needsServers,
      query,
      status,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
