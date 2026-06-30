import { createContext, useContext } from 'react'

export const GameContext = createContext(null)

export function useGameContext() {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('useGameContext moet binnen GameProvider gebruikt worden.')
  }

  return context
}
