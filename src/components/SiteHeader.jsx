import { Link, NavLink } from 'react-router-dom'

export function SiteHeader() {
  return (
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
  )
}
