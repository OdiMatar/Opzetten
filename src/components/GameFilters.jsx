export function GameFilters({
  minPlayers,
  needsAchievements,
  needsServers,
  setMinPlayers,
  setNeedsAchievements,
  setNeedsServers,
}) {
  return (
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
  )
}
