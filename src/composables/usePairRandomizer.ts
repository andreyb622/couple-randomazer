import { computed, ref } from 'vue'
import { INITIAL_BOYS, INITIAL_GIRLS } from '../data/names'

export interface Pair {
  girl: string
  boy: string
}

function cloneList(list: readonly string[]): string[] {
  return [...list]
}

function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length)
}

export function usePairRandomizer() {
  const girls = ref<string[]>(cloneList(INITIAL_GIRLS))
  const boys = ref<string[]>(cloneList(INITIAL_BOYS))
  const pairs = ref<Pair[]>([])

  const canGenerate = computed(() => girls.value.length > 0 && boys.value.length > 0)
  const remainingCount = computed(() => Math.min(girls.value.length, boys.value.length))

  function generatePair(): Pair | null {
    if (!canGenerate.value) {
      return null
    }

    const girlIndex = getRandomIndex(girls.value.length)
    const boyIndex = getRandomIndex(boys.value.length)

    const girl = girls.value[girlIndex]!
    const boy = boys.value[boyIndex]!

    girls.value.splice(girlIndex, 1)
    boys.value.splice(boyIndex, 1)

    const pair: Pair = { girl, boy }
    pairs.value.push(pair)

    return pair
  }

  function reset(): void {
    girls.value = cloneList(INITIAL_GIRLS)
    boys.value = cloneList(INITIAL_BOYS)
    pairs.value = []
  }

  function addName(list: 'girls' | 'boys', name: string): boolean {
    const trimmed = name.trim()

    if (!trimmed) {
      return false
    }

    const target = list === 'girls' ? girls.value : boys.value

    if (target.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
      return false
    }

    target.push(trimmed)
    return true
  }

  function removeName(list: 'girls' | 'boys', index: number): void {
    const target = list === 'girls' ? girls.value : boys.value
    target.splice(index, 1)
  }

  return {
    girls,
    boys,
    pairs,
    canGenerate,
    remainingCount,
    generatePair,
    reset,
    addName,
    removeName,
  }
}
