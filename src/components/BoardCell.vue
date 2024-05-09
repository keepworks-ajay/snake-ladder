<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { PlayerColorClasses } from '@/lib/types'
import { usePlayerStore } from '@/stores/player'
import { onMounted } from 'vue'
const props = defineProps(['cell'])
const emit = defineEmits(['ready'])

const { players } = storeToRefs(usePlayerStore())

onMounted(() => {
  emit('ready', props.cell)
})
</script>

<template>
  <div class="w-14 h-14 relative border-2 border-white">
    <div class="absolute inset-x-0 top-0 flex justify-center items-center bg-gray-200">
      <!-- bg-red-500 bg-blue-500 bg-green-500 bg-yellow-500 -->
      <div v-for="(player, index) in players" :key="index">
        <div
          v-if="player.position === cell"
          class="w-3 h-3"
          :class="`bg-${PlayerColorClasses[index]}-500`"
        ></div>
      </div>
    </div>
    <div class="flex justify-center items-center h-12 bg-gray-200">
      <p class="text-center text-gray-600">{{ cell }}</p>
    </div>
  </div>
</template>
