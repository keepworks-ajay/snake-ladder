import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import type { GameStatus } from '@/lib/types'

import { usePlayerStore } from './player'
import type { Player } from '@/lib/types'

export const useGameStore = defineStore('game', () => {
  const status: Ref<GameStatus> = ref('LOBBY')
  const logs: Ref<string[]> = ref([])
  const max_players_allowed = 4

  const { addPlayer } = usePlayerStore()

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

  function initialize(players: Player[]) {
    // change game status
    changeGameStatus('STARTED')

    // add players
    players.forEach((player) => addPlayer(player))
  }

  return {
    status,
    logs,
    max_players_allowed,

    initialize
  }
})
