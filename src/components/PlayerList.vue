<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { PlayerColorClasses } from '@/lib/types'
import { usePlayerStore } from '@/stores/player'
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
const props = defineProps(['cell'])
const emit = defineEmits(['ready'])

const { players } = storeToRefs(usePlayerStore())
const { winnerPlayerIndex } = storeToRefs(useGameStore())

onMounted(() => {
  emit('ready', props.cell)
})
</script>

<template>
  <div>
    <!-- border-red-400 border-blue-400 border-green-400 border-yellow-400 -->
    <h2 class="text-xl font-semibold mb-4">Players playing:</h2>
    <div v-for="(player, index) in players" :key="index">
      <div
        class="flex items-center space-x-4"
        :class="[
          winnerPlayerIndex === index
            ? `border-2 border-${PlayerColorClasses[index]}-400 rounded-lg animate-pulse`
            : ''
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12"
          :class="[`text-${PlayerColorClasses[index]}-500`]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <div class="flex flex-col">
          <p class="text-lg font-semibold">
            {{ player.name }}
          </p>
          <p class="text-gray-500">Position : {{ player.position }}</p>
          <p v-if="player.throwingDice && winnerPlayerIndex === -1" class="text-gray-500">
            Your turn to throw dice.
          </p>
          <p v-if="index === winnerPlayerIndex" class="text-gray-500">Winner</p>
        </div>
      </div>
    </div>
  </div>
</template>
