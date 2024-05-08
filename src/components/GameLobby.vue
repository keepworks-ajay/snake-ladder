<script setup lang="ts">
import { useGameStore } from '@/stores/game'

import PrimaryButton from '@/components/PrimaryButton.vue'
import type { Player } from '@/lib/types'
import { ref, type Ref } from 'vue'

const players: Ref<Player[]> = ref([])

const { max_players_allowed, initialize } = useGameStore()

function addPlayer() {
  const player: Player = {
    name: '',
    position: 0,
    throwingDice: players.value.length ? false : true
  }

  players.value.push(player)
}

function removePlayer(index: number) {
  players.value = [...players.value].filter((_, i) => index !== i)
}

function play(event: any) {
  event.preventDefault()

  initialize(players.value)
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <p class="text-6xl">Snakes &amp; Ladders</p>
    </div>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-gray-50 px-12 py-4 min-w-[50%] space-y-4">
        <form @submit="play" class="space-y-4 w-full">
          <!-- Add players to game -->
          <div>
            <label for="players" class="block text-gray-700 font-bold mb-2"
              >Players (Upto {{ max_players_allowed }})</label
            >
            <div class="inline-block relative w-full space-y-2">
              <div v-for="(player, index) in players" :key="index" class="flex items-center">
                <input
                  type="text"
                  class="flex-1 border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:border-blue-500"
                  placeholder="Player name"
                  required
                  v-model="player.name"
                />
                <button
                  @click="() => removePlayer(index)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                >
                  Remove
                </button>
              </div>

              <div v-if="max_players_allowed > players.length" class="flex justify-center">
                <PrimaryButton @click="addPlayer" class="mx-auto">Add Player</PrimaryButton>
              </div>
            </div>
          </div>

          <!-- Start game button -->
          <PrimaryButton type="submit" class="w-full uppercase"> Start Game </PrimaryButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
