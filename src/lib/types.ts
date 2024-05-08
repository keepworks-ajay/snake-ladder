export type GameStatus = 'LOBBY' | 'STARTED' | 'ENDED'

export interface Player {
  name: string
  position: number
  throwingDice: boolean
}
