<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { generateCells } from '@/lib/helpers'
import type { CellPoint } from '@/lib/types.ts'

import Cell from '@/components/BoardCell.vue'
import PlayerList from '@/components/PlayerList.vue'
import Dice from '@/components/DiceBox.vue'
import { useGameStore } from '@/stores/game'
import PrimaryButton from '@/components/PrimaryButton.vue'

const rows = generateCells()
const { winnerPlayerIndex, logs } = storeToRefs(useGameStore())

const cellDivPoints: Ref<CellPoint[]> = ref([])

function calculateCellCenter(rowIndex: number, colIndex: number) {
  ++rowIndex
  ++colIndex

  let x = colIndex * 54 - 27
  let y = rowIndex * 56 - 27

  return {
    x,
    y
  }
}

function setDivPoint(cell: number, rowIndex: number, colIndex: number) {
  cellDivPoints.value = [...cellDivPoints.value].filter((divPoint) => divPoint.cell !== cell)

  cellDivPoints.value.push({
    cell,
    point: calculateCellCenter(rowIndex, colIndex)
  })
}

function resetGame() {
  location.reload()
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <p class="text-6xl">Snakes &amp; Ladders</p>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3 bg-gray-200 p-4">
        <!-- Players list -->
        <PlayerList />

        <!-- Roll dice button -->
        <Dice v-if="winnerPlayerIndex === -1" />

        <!-- Reset button on game end -->
        <PrimaryButton v-else @click="resetGame" class="mt-10"> Reload Game </PrimaryButton>
      </div>
      <div class="col-span-6 bg-gray-200 p-4">
        <!-- Game board -->
        <div class="relative max-w-[80%] mx-auto">
          <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="flex">
            <Cell
              v-for="(cell, colIndex) in row"
              :key="colIndex"
              :cell="cell"
              @ready="() => setDivPoint(cell, rowIndex, colIndex)"
            />
          </div>
        </div>
      </div>
      <div class="col-span-3 bg-gray-300 p-4">
        <!-- Event logs -->
        <p class="text-2xl">Event logs</p>
        <ol class="list-inside">
          <li v-for="(log, index) in logs" :key="index" class="mb-2">{{ log }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
