import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia, storeToRefs } from 'pinia'
import { usePlayerStore } from '../player'

describe('Player Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should be zero players at start.', () => {
    const { players } = storeToRefs(usePlayerStore())
    expect(players.value.length).toBe(0)
  })

  it('should be able to add player.', () => {
    const { players } = storeToRefs(usePlayerStore())
    const { addPlayer } = usePlayerStore()

    addPlayer({
      name: 'test player',
      position: 0,
      throwingDice: true
    })

    expect(players.value.length).toBeGreaterThan(0)
  })

  it('should be able to update the player position.', () => {
    const { players } = storeToRefs(usePlayerStore())
    const { addPlayer, updatePlayer } = usePlayerStore()

    addPlayer({
      name: 'test player',
      position: 0,
      throwingDice: true
    })

    updatePlayer(0, {
      name: 'test player',
      position: 100,
      throwingDice: true
    })

    expect(players.value[0].position).equal(100)
  })

  it('should be able to update the player dice turn.', () => {
    const { players } = storeToRefs(usePlayerStore())
    const { addPlayer, updatePlayer } = usePlayerStore()

    addPlayer({
      name: 'test player',
      position: 0,
      throwingDice: true
    })

    updatePlayer(0, {
      name: 'test player',
      position: 0,
      throwingDice: false
    })

    expect(players.value[0].throwingDice).equal(false)
  })
})
