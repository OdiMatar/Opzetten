export function GameSearchForm({ isLoading, onSearch, query, setQuery }) {
  return (
    <form className="search-panel" id="search" onSubmit={onSearch}>
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
  )
}
