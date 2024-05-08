import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player } from '@/lib/types'

export const usePlayerStore = defineStore('player', () => {
  const players: Ref<Player[]> = ref([])

  function addPlayer(player: Player) {
    players.value.push(player)
  }

  function updatePlayer(playerIndex: number, player: Player) {
    const updatedPlayers = [...players.value].map((p, index) => {
      if (index === playerIndex) {
        return player
      }
      return p
    })

    players.value = updatedPlayers
  }

  return {
    players,

    addPlayer,
    updatePlayer
  }
})
