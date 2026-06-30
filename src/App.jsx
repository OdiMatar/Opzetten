import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import { GameProvider } from './GameContext.jsx'
import { useGameContext } from './useGameContext.js'

function Layout() {
  return (
    <main className="app">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Odi Search Steam home">
          <span className="brand-mark" aria-hidden="true">
            OS
          </span>
          <span>Odi Search Steam</span>
        </Link>
        <nav className="site-nav" aria-label="Hoofdnavigatie">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/over">Over</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:appid" element={<GameDetailPage />} />
        <Route path="/over" element={<AboutPage />} />
      </Routes>

      <footer className="site-footer">
        <span>Odi Search Steam</span>
        <span>Zoek, filter en vergelijk Steam-games</span>
      </footer>
    </main>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Steam game finder</p>
          <h1>Odi Search Steam</h1>
          <p className="lede">
            Een zoekplek voor Steam-games waar je snel ziet welke games actief
            zijn, achievements hebben en serverinformatie teruggeven.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" to="/games">
              Games zoeken
            </Link>
            <Link className="secondary-link" to="/over">
              Projectuitleg
            </Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Project samenvatting">
          <span className="hero-mark" aria-hidden="true">
            OS
          </span>
          <dl>
            <div>
              <dt>Bron</dt>
              <dd>Steam API</dd>
            </div>
            <div>
              <dt>Items</dt>
              <dd>Games</dd>
            </div>
            <div>
              <dt>Pagina's</dt>
              <dd>Home, overzicht, details en over</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="about-site">
        <div>
          <p className="eyebrow">Waarom deze site?</p>
          <h2>Een snellere manier om Steam-games te bekijken</h2>
        </div>
        <p>
          Steam heeft heel veel games. Odi Search Steam maakt daar een kleiner
          en duidelijker overzicht van. Je zoekt op een titel, bekijkt de
          resultaten als kaarten en klikt door naar een detailpagina wanneer je
          meer over een game wilt zien.
        </p>
      </section>
    </>
  )
}

function GamesPage() {
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

      <form className="search-panel" id="search" onSubmit={fetchGames}>
        <label className="field">
          <span>Game zoeken</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bijvoorbeeld: counter, dota, portal"
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Zoeken...' : 'Zoeken'}
        </button>
      </form>

      <section className="filters" aria-label="Filters">
        <label className="field range-field">
          <span>Minimale spelers: {minPlayers.toLocaleString('nl-NL')}</span>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={minPlayers}
            onChange={(event) => setMinPlayers(Number(event.target.value))}
          />
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            checked={needsServers}
            onChange={(event) => setNeedsServers(event.target.checked)}
          />
          <span>Heeft servers</span>
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            checked={needsAchievements}
            onChange={(event) => setNeedsAchievements(event.target.checked)}
          />
          <span>Heeft achievements</span>
        </label>
      </section>

      <p className="status">{status}</p>

      <section className="results" id="results" aria-live="polite">
        {!isLoading && filteredGames.length === 0 ? (
          <p className="empty-state">Geen games gevonden met deze filters.</p>
        ) : null}

        {filteredGames.map((game) => (
          <GameCard game={game} key={game.appid} />
        ))}
      </section>
    </>
  )
}

function GameCard({ game }) {
  return (
    <article className="game-card">
      {game.image ? <img className="game-image" src={game.image} alt="" /> : null}
      <div>
        <h2>{game.name}</h2>
        <Link to={`/games/${game.appid}`}>Bekijk details</Link>
        {game.metascore ? <p className="metascore">Metascore {game.metascore}</p> : null}
      </div>
      <dl>
        <div>
          <dt>Spelers</dt>
          <dd>{game.playerCount.toLocaleString('nl-NL')}</dd>
        </div>
        <div>
          <dt>Servers</dt>
          <dd>{game.serverCount}</dd>
        </div>
        <div>
          <dt>Achievements</dt>
          <dd>{game.achievementCount}</dd>
        </div>
      </dl>
    </article>
  )
}

function GameDetailPage() {
  const { appid } = useParams()
  const { games, isLoading } = useGameContext()
  const game = games.find((item) => String(item.appid) === appid)

  if (isLoading) {
    return <p className="status">Gamegegevens laden...</p>
  }

  if (!game) {
    return (
      <section className="detail-page">
        <p className="eyebrow">Game niet gevonden</p>
        <h1>Deze game staat niet in de huidige zoeklijst</h1>
        <p>
          Ga terug naar het game-overzicht en zoek opnieuw. De detailpagina
          gebruikt de data die al in de gedeelde state staat.
        </p>
        <Link className="primary-link" to="/games">
          Terug naar games
        </Link>
      </section>
    )
  }

  return (
    <section className="detail-page">
      {game.image ? <img className="detail-image" src={game.image} alt="" /> : null}
      <div>
        <p className="eyebrow">Game details</p>
        <h1>{game.name}</h1>
        <p>
          Deze detailpagina gebruikt dezelfde game-data als het overzicht. Zo
          hoeft de app niet opnieuw dezelfde informatie op te halen wanneer je
          van de lijst naar een gamepagina gaat.
        </p>
      </div>
      <dl className="detail-stats">
        <div>
          <dt>Steam App ID</dt>
          <dd>{game.appid}</dd>
        </div>
        <div>
          <dt>Spelers online</dt>
          <dd>{game.playerCount.toLocaleString('nl-NL')}</dd>
        </div>
        <div>
          <dt>Servers gevonden</dt>
          <dd>{game.serverCount}</dd>
        </div>
        <div>
          <dt>Achievements</dt>
          <dd>{game.achievementCount}</dd>
        </div>
      </dl>
      <div className="hero-actions">
        <a
          className="primary-link"
          href={`https://store.steampowered.com/app/${game.appid}`}
          target="_blank"
          rel="noreferrer"
        >
          Open op Steam
        </a>
        <Link className="secondary-link" to="/games">
          Terug naar overzicht
        </Link>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="about-site page-about">
      <div>
        <p className="eyebrow">Over Odi Search Steam</p>
        <h1>Mijn zoekmachine voor Steam-games</h1>
      </div>
      <p>
        Odi Search Steam is gemaakt om Steam-games sneller en duidelijker te
        bekijken. Ik haal gamegegevens op, bewaar de resultaten slim in gedeelde
        state en toon ze op meerdere pagina's. Zo kan iemand zoeken, filteren,
        vergelijken en doorklikken naar details zonder door losse Steam-data te
        hoeven zoeken.
      </p>
    </section>
  )
}

function App() {
  return (
    <GameProvider>
      <Layout />
    </GameProvider>
  )
}

export default App
