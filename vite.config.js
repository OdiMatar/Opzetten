import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function steamApiPlugin(steamApiKey) {
  return {
    name: 'steam-api',
    configureServer(server) {
      server.middlewares.use('/api/steam/global-stats', async (req, res) => {
        if (!steamApiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'STEAM_API_KEY ontbreekt in .env' }))
          return
        }

        const steamUrl = new URL(
          'https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/',
        )

        steamUrl.searchParams.set('appid', '730')
        steamUrl.searchParams.set('count', '1')
        steamUrl.searchParams.set('name[0]', 'total_kills')
        steamUrl.searchParams.set('format', 'json')
        steamUrl.searchParams.set('key', steamApiKey)

        try {
          const steamResponse = await fetch(steamUrl)
          const data = await steamResponse.text()

          res.statusCode = steamResponse.status
          res.setHeader('Content-Type', 'application/json')
          res.end(data)
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
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
