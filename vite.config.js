import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const GAME_RESULT_LIMIT = 12

function steamApiPlugin(steamApiKey) {
  function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  async function fetchJson(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Steam API request failed: ${response.status}`)
    }

    return response.json()
  }

  async function searchSteamStore(query) {
    const steamUrl = new URL(
      'https://store.steampowered.com/api/storesearch/',
    )

    steamUrl.searchParams.set('term', query)
    steamUrl.searchParams.set('cc', 'NL')
    steamUrl.searchParams.set('l', 'dutch')
    steamUrl.searchParams.set('count', String(GAME_RESULT_LIMIT))

    const data = await fetchJson(steamUrl)

    return data.items?.filter((item) => item.type === 'app') ?? []
  }

  async function getCurrentPlayers(appid) {
    const steamUrl = new URL(
      'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/',
    )

    steamUrl.searchParams.set('appid', appid)

    try {
      const data = await fetchJson(steamUrl)
      return data.response?.player_count ?? 0
    } catch {
      return 0
    }
  }

  async function getAchievementCount(appid) {
    const steamUrl = new URL(
      'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/',
    )

    steamUrl.searchParams.set('gameid', appid)

    try {
      const data = await fetchJson(steamUrl)
      return data.achievementpercentages?.achievements?.length ?? 0
    } catch {
      return 0
    }
  }

  async function getServerCount(appid) {
    const steamUrl = new URL(
      'https://api.steampowered.com/IGameServersService/GetServerList/v1/',
    )

    steamUrl.searchParams.set('key', steamApiKey)
    steamUrl.searchParams.set('filter', `\\appid\\${appid}`)
    steamUrl.searchParams.set('limit', '25')

    try {
      const data = await fetchJson(steamUrl)
      return data.response?.servers?.length ?? 0
    } catch {
      return 0
    }
  }

  async function enrichGame(app) {
    const appid = app.id ?? app.appid
    const [playerCount, achievementCount, serverCount] = await Promise.all([
      getCurrentPlayers(appid),
      getAchievementCount(appid),
      getServerCount(appid),
    ])

    return {
      appid,
      name: app.name,
      image: app.tiny_image,
      metascore: app.metascore,
      playerCount,
      achievementCount,
      serverCount,
      hasAchievements: achievementCount > 0,
      hasServers: serverCount > 0,
    }
  }

  return {
    name: 'steam-api',
    configureServer(server) {
      server.middlewares.use('/api/steam/games', async (req, res) => {
        if (!steamApiKey) {
          sendJson(res, 500, { error: 'STEAM_API_KEY ontbreekt in .env' })
          return
        }

        try {
          const requestUrl = new URL(req.url, 'http://localhost')
          const query = requestUrl.searchParams.get('query')?.trim() ?? ''

          if (query.length < 2) {
            sendJson(res, 200, { games: [] })
            return
          }

          const matches = await searchSteamStore(query)
          const games = await Promise.all(matches.map(enrichGame))

          sendJson(res, 200, { games })
        } catch (error) {
          sendJson(res, 500, { error: error.message })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), steamApiPlugin(env.STEAM_API_KEY)],
  }
})
