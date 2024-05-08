<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

import GameLobby from '@/components/GameLobby.vue'
import GamePlay from '@/components/GamePlay.vue'

const status = computed(() => useGameStore().status)
const component = computed(() => {
  return {
    LOBBY: GameLobby,
    STARTED: GamePlay,
    ENDED: GamePlay
  }[status.value]
})
</script>

<template>
  <main>
    <component :is="component"></component>
  </main>
</template>

<style scoped></style>
