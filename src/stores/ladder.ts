import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ladder } from '@/lib/types'

export const useLadderStore = defineStore('ladder', () => {
  const ladders: Ref<Ladder[]> = ref([])

  function addLadder(ladder: Ladder) {
    ladders.value.push(ladder)
  }

  return {
    ladders,

    addLadder
  }
})
