import { Route, Routes } from 'react-router-dom'
import { AboutPage } from '../pages/AboutPage.jsx'
import { GameDetailPage } from '../pages/GameDetailPage.jsx'
import { GamesPage } from '../pages/GamesPage.jsx'
import { HomePage } from '../pages/HomePage.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { SiteHeader } from './SiteHeader.jsx'

export function Layout() {
  return (
    <main className="app">
      <SiteHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:appid" element={<GameDetailPage />} />
        <Route path="/over" element={<AboutPage />} />
      </Routes>

      <SiteFooter />
    </main>
  )
}
