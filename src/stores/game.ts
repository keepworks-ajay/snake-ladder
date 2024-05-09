import { computed, ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import type { GameStatus } from '@/lib/types'

import { usePlayerStore } from './player'
import type { Player } from '@/lib/types'
import { getDiceNumber } from '@/lib/helpers'

export const useGameStore = defineStore('game', () => {
  const status: Ref<GameStatus> = ref('LOBBY')
  const logs: Ref<string[]> = ref([])
  const maxPlayersAllowed = 4
  const dice: Ref<number> = ref(1)
  const winnerPlayerIndex: Ref<number> = computed(() =>
    players.value.findIndex((player) => player.position === 100)
  )

  const { players } = storeToRefs(usePlayerStore())
  const { addPlayer, updatePlayer } = usePlayerStore()

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

  function move(playerIndex: number, position: number) {
    const player = players.value[playerIndex]

    if (position > 100) {
      return
    }

    updatePlayer(playerIndex, {
      ...player,
      position
    })

    logs.value.push(`Player ${playerIndex + 1} moved to position ${position}`)

    if (position === 100) {
      changeGameStatus('ENDED')
    }
  }

  function initialize(players: Player[]) {
    // change game status
    changeGameStatus('STARTED')

    // add players
    players.forEach((player) => addPlayer(player))
  }

  function rollDice() {
    if (status.value !== 'STARTED') {
      return
    }

    const playerIndex = players.value.findIndex((player) => player.throwingDice)
    const player = players.value[playerIndex]

    // if there are multi-players update next player to throw dice
    if (players.value.length > 1) {
      updatePlayer(playerIndex, {
        ...player,
        throwingDice: false
      })

      let nextPlayerIndex = playerIndex + 1
      if (playerIndex === players.value.length - 1) {
        nextPlayerIndex = 0
      }

      const nextPlayer = players.value[nextPlayerIndex]
      updatePlayer(nextPlayerIndex, {
        ...nextPlayer,
        throwingDice: true
      })
    }

    dice.value = getDiceNumber()

    if (player.position === 0 && dice.value !== 6) {
      return
    }

    const position = player.position === 0 && dice.value === 6 ? 1 : player.position + dice.value

    move(playerIndex, position)
  }

  return {
    status,
    logs,
    maxPlayersAllowed,
    dice,
    winnerPlayerIndex,

    initialize,
    rollDice
  }
})
