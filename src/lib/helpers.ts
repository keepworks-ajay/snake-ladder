export function generateUniqueRanges(
  numRanges: number,
  minRangeDiff: number = 4,
  excepts: number[][] = []
): number[][] {
  const ranges: number[][] = []
  const min = 2
  const max = 99

  while (ranges.length < numRanges) {
    const start = Math.floor(Math.random() * (max - min + 1)) + min
    const end = Math.floor(Math.random() * (max - start + 1)) + start
    const newRange = [start, end]

    // diff between start and end should be greater than or equal to four
    if (end - start < minRangeDiff) {
      continue
    }

    // check if start is unique
    const startExists = ranges.find((range) => range[0] === newRange[0])
    if (startExists) {
      continue
    }

    // check if excepts already has it
    const existsInExceps = excepts.find(
      (range) => range[0] === newRange[0] && range[1] === newRange[1]
    )
    if (existsInExceps) {
      continue
    }

    // Check if the new range is unique
    const isUnique = !ranges.some((range) => {
      return range[0] === newRange[0] && range[1] === newRange[1]
    })

    if (isUnique) {
      ranges.push(newRange)
    }
  }

  return ranges
}

export function generateCells(): number[][] {
  const cells = Array.from({ length: 100 }, (_, index) => 100 - index)

  const grid = []
  const chunkSize = 10
  for (let i = 0; i < cells.length; i += chunkSize) {
    const chunk = cells.slice(i, i + chunkSize)
    grid.push(chunk)
  }

  for (let index = 0; index < grid.length; index++) {
    if ((index + 1) % 2 === 0) {
      grid[index] = [...grid[index]].reverse()
    }
  }

  return grid
}

export function getDiceNumber(crookedDice: boolean = false) {
  if (crookedDice) {
    return [2, 4, 6][Math.floor(Math.random() * 3)]
  }

  return Math.floor(Math.random() * 6) + 1
}
