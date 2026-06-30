import { GameCard } from './GameCard.jsx'

export function GameResults({ filteredGames, isLoading }) {
  return (
    <section className="results" id="results" aria-live="polite">
      {!isLoading && filteredGames.length === 0 ? (
        <p className="empty-state">Geen games gevonden met deze filters.</p>
      ) : null}

      {filteredGames.map((game) => (
        <GameCard game={game} key={game.appid} />
      ))}
    </section>
  )
}
