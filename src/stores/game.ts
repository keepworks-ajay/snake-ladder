import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import type { GameStatus } from '@/lib/types'

export const useGameStore = defineStore('game', () => {
  const status: Ref<GameStatus> = ref('LOBBY')
  const logs: Ref<string[]> = ref([])

  function changeGameStatus(gameStatus: GameStatus) {
    // update the game status
    status.value = gameStatus

    // logs
    logs.value.push(
      `Game ${
        {
          LOBBY: 'not started',
          STARTED: 'started',
          ENDED: 'ended'
        }[gameStatus]
      }.`
    )
  }

  function initialize() {
    // change game status
    changeGameStatus('STARTED')
  }

  return {
    status,

    initialize
  }
})
