import { Link, useParams } from 'react-router-dom'
import { useGameContext } from '../useGameContext.js'

export function GameDetailPage() {
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
