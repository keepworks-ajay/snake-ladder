export type GameStatus = 'LOBBY' | 'STARTED' | 'ENDED'

export interface Player {
  name: string
  position: number
  throwingDice: boolean
}

export interface CellPoint {
  cell: number
  point: {
    x: number
    y: number
  }
}

// text-red-500 text-blue-500 text-green-500 text-yellow-500
// bg-red-500 bg-blue-500 bg-green-500 bg-yellow-500
export const PlayerColorClasses = ['red', 'blue', 'green', 'yellow']

export interface Snake {
  tailAt: number
  mouthAt: number
}

export interface Ladder {
  startFrom: number
  endAt: number
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'
