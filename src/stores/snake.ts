import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Snake } from '@/lib/types'

export const useSnakeStore = defineStore('snake', () => {
  const snakes: Ref<Snake[]> = ref([])

  function addSnake(snake: Snake) {
    snakes.value.push(snake)
  }

  return {
    snakes,

    addSnake
  }
})
