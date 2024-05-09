<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { useSnakeStore } from '@/stores/snake'
import { useLadderStore } from '@/stores/ladder'

import { generateCells } from '@/lib/helpers'
import type { CellPoint } from '@/lib/types.ts'

import Cell from '@/components/BoardCell.vue'
import PlayerList from '@/components/PlayerList.vue'
import Dice from '@/components/DiceBox.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const rows = generateCells()
const { winnerPlayerIndex, logs } = storeToRefs(useGameStore())
const { snakes } = storeToRefs(useSnakeStore())
const { ladders } = storeToRefs(useLadderStore())

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
          <div v-if="cellDivPoints.length">
            <!-- Snake lines -->
            <svg
              v-for="(snake, index) in snakes"
              :key="index"
              class="absolute top-0 left-0 w-[100%] h-[100%]"
              :id="`mouthAt - ${snake.mouthAt} tailAt - ${snake.tailAt}`"
            >
              <line
                :x1="cellDivPoints.find((div) => div.cell === snake.tailAt)?.point.x"
                :y1="cellDivPoints.find((div) => div.cell === snake.tailAt)?.point.y"
                :x2="cellDivPoints.find((div) => div.cell === snake.mouthAt)?.point.x"
                :y2="cellDivPoints.find((div) => div.cell === snake.mouthAt)?.point.y"
                stroke="black"
                stroke-width="2"
              />
            </svg>
            <!-- Ladder lines -->
            <svg
              v-for="(ladder, index) in ladders"
              :key="index"
              class="absolute top-0 left-0 w-[100%] h-[100%]"
              :id="`startFrom - ${ladder.startFrom} endAt - ${ladder.endAt}`"
            >
              <line
                :x1="cellDivPoints.find((div) => div.cell === ladder.startFrom)?.point.x"
                :y1="cellDivPoints.find((div) => div.cell === ladder.startFrom)?.point.y"
                :x2="cellDivPoints.find((div) => div.cell === ladder.endAt)?.point.x"
                :y2="cellDivPoints.find((div) => div.cell === ladder.endAt)?.point.y"
                stroke="black"
                stroke-width="2"
                stroke-dasharray="5,5"
              />
            </svg>
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
