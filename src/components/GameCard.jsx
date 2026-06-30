import { Link } from 'react-router-dom'

export function GameCard({ game }) {
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
