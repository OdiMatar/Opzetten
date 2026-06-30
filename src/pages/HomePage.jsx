import { Link } from 'react-router-dom'

export function HomePage() {
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
