<script setup lang="ts">
import { useGameStore } from '@/stores/game'

import PrimaryButton from '@/components/PrimaryButton.vue'

const { initialize } = useGameStore()

function play(event: any) {
  event.preventDefault()

  initialize()
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <p class="text-6xl">Snakes &amp; Ladders</p>
    </div>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-gray-50 px-12 py-4 min-w-[50%] space-y-4">
        <form @submit="play">
          <!-- Add players to game -->
          <!-- Start game button -->
          <PrimaryButton type="submit"> Start Game </PrimaryButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
