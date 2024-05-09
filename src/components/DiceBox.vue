<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { PlayerColorClasses } from '@/lib/types'
import { usePlayerStore } from '@/stores/player'
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'
const props = defineProps(['cell'])
const emit = defineEmits(['ready'])

const { players } = storeToRefs(usePlayerStore())

const { dice } = storeToRefs(useGameStore())
const { rollDice } = useGameStore()

onMounted(() => {
  emit('ready', props.cell)
})
</script>

<template>
  <div class="bg-gray-200 p-8 flex justify-center items-center">
    <!-- bg-red-700 bg-blue-700 bg-green-700 bg-yellow-700 -->
    <div
      @click="rollDice"
      class="w-24 h-24 bg-gray-700 rounded-lg flex justify-center items-center text-gray-200 text-4xl font-bold cursor-pointer shadow-lg"
      :class="`bg-${PlayerColorClasses[players.findIndex((player) => player.throwingDice)]}-700`"
    >
      {{ dice }}
    </div>
  </div>
</template>
