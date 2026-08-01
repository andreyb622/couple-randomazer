import { computed, ref } from 'vue'
import { INITIAL_BOYS, INITIAL_GIRLS } from '../data/names'

export interface Pair {
  girl: string
  boy: string
}

export type AppPhase = 'selection' | 'pairing'

function cloneList(list: readonly string[]): string[] {
  return [...list]
}

function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length)
}

function buildPool(catalog: readonly string[], selected: string[]): string[] {
  const selectedSet = new Set(selected.map((name) => name.toLowerCase()))

  return catalog.filter((name) => !selectedSet.has(name.toLowerCase()))
}

function mergeCatalog(...lists: readonly string[][]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (const list of lists) {
    for (const name of list) {
      const key = name.toLowerCase()

      if (!seen.has(key)) {
        seen.add(key)
        result.push(name)
      }
    }
  }

  return result
}

function isDuplicateName(name: string, lists: readonly string[][]): boolean {
  const normalized = name.toLowerCase()

  return lists.some((list) => list.some((item) => item.toLowerCase() === normalized))
}

function listsEqual(first: readonly string[], second: readonly string[]): boolean {
  if (first.length !== second.length) {
    return false
  }

  const sortedFirst = [...first].sort()
  const sortedSecond = [...second].sort()

  return sortedFirst.every((item, index) => item === sortedSecond[index])
}

export function usePairRandomizer() {
  const phase = ref<AppPhase>('selection')
  const poolGirls = ref<string[]>(cloneList(INITIAL_GIRLS))
  const poolBoys = ref<string[]>(cloneList(INITIAL_BOYS))
  const selectedGirls = ref<string[]>([])
  const selectedBoys = ref<string[]>([])
  const girls = ref<string[]>([])
  const boys = ref<string[]>([])
  const pairs = ref<Pair[]>([])

  const canConfirmSelection = computed(
    () => selectedGirls.value.length > 0 && selectedBoys.value.length > 0,
  )
  const canGenerate = computed(() => girls.value.length > 0 && boys.value.length > 0)
  const remainingCount = computed(() => Math.min(girls.value.length, boys.value.length))
  const canResetSelection = computed(
    () =>
      selectedGirls.value.length > 0
      || selectedBoys.value.length > 0
      || !listsEqual(poolGirls.value, INITIAL_GIRLS)
      || !listsEqual(poolBoys.value, INITIAL_BOYS),
  )
  const canResetPairing = computed(
    () =>
      pairs.value.length > 0
      || !listsEqual(girls.value, selectedGirls.value)
      || !listsEqual(boys.value, selectedBoys.value),
  )

  function selectGirl(index: number): void {
    const name = poolGirls.value[index]

    if (!name) {
      return
    }

    poolGirls.value.splice(index, 1)
    selectedGirls.value.push(name)
  }

  function selectBoy(index: number): void {
    const name = poolBoys.value[index]

    if (!name) {
      return
    }

    poolBoys.value.splice(index, 1)
    selectedBoys.value.push(name)
  }

  function deselectGirl(index: number): void {
    const name = selectedGirls.value[index]

    if (!name) {
      return
    }

    selectedGirls.value.splice(index, 1)
    poolGirls.value.push(name)
  }

  function deselectBoy(index: number): void {
    const name = selectedBoys.value[index]

    if (!name) {
      return
    }

    selectedBoys.value.splice(index, 1)
    poolBoys.value.push(name)
  }

  function confirmSelection(): boolean {
    if (!canConfirmSelection.value) {
      return false
    }

    girls.value = cloneList(selectedGirls.value)
    boys.value = cloneList(selectedBoys.value)
    pairs.value = []
    phase.value = 'pairing'

    return true
  }

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

  function resetSelection(): void {
    poolGirls.value = cloneList(INITIAL_GIRLS)
    poolBoys.value = cloneList(INITIAL_BOYS)
    selectedGirls.value = []
    selectedBoys.value = []
  }

  function addToPool(list: 'girls' | 'boys', name: string): boolean {
    const trimmed = name.trim()

    if (!trimmed) {
      return false
    }

    if (list === 'girls') {
      if (isDuplicateName(trimmed, [poolGirls.value, selectedGirls.value])) {
        return false
      }

      poolGirls.value.push(trimmed)
      return true
    }

    if (isDuplicateName(trimmed, [poolBoys.value, selectedBoys.value])) {
      return false
    }

    poolBoys.value.push(trimmed)
    return true
  }

  function addParticipant(list: 'girls' | 'boys', name: string): boolean {
    const trimmed = name.trim()

    if (!trimmed) {
      return false
    }

    if (list === 'girls') {
      if (isDuplicateName(trimmed, [selectedGirls.value])) {
        return false
      }

      girls.value.push(trimmed)
      selectedGirls.value.push(trimmed)
      return true
    }

    if (isDuplicateName(trimmed, [selectedBoys.value])) {
      return false
    }

    boys.value.push(trimmed)
    selectedBoys.value.push(trimmed)
    return true
  }

  function removeParticipant(list: 'girls' | 'boys', index: number): void {
    if (list === 'girls') {
      const name = girls.value[index]

      if (!name) {
        return
      }

      girls.value.splice(index, 1)

      const selectedIndex = selectedGirls.value.findIndex(
        (item) => item.toLowerCase() === name.toLowerCase(),
      )

      if (selectedIndex !== -1) {
        selectedGirls.value.splice(selectedIndex, 1)
      }

      return
    }

    const name = boys.value[index]

    if (!name) {
      return
    }

    boys.value.splice(index, 1)

    const selectedIndex = selectedBoys.value.findIndex(
      (item) => item.toLowerCase() === name.toLowerCase(),
    )

    if (selectedIndex !== -1) {
      selectedBoys.value.splice(selectedIndex, 1)
    }
  }

  function resetPairing(): void {
    girls.value = cloneList(selectedGirls.value)
    boys.value = cloneList(selectedBoys.value)
    pairs.value = []
  }

  function backToSelection(): void {
    const girlsCatalog = mergeCatalog(poolGirls.value, selectedGirls.value)
    const boysCatalog = mergeCatalog(poolBoys.value, selectedBoys.value)

    poolGirls.value = buildPool(girlsCatalog, selectedGirls.value)
    poolBoys.value = buildPool(boysCatalog, selectedBoys.value)
    girls.value = []
    boys.value = []
    pairs.value = []
    phase.value = 'selection'
  }

  return {
    phase,
    poolGirls,
    poolBoys,
    selectedGirls,
    selectedBoys,
    girls,
    boys,
    pairs,
    canConfirmSelection,
    canGenerate,
    canResetSelection,
    canResetPairing,
    remainingCount,
    selectGirl,
    selectBoy,
    deselectGirl,
    deselectBoy,
    confirmSelection,
    generatePair,
    addToPool,
    addParticipant,
    removeParticipant,
    resetSelection,
    resetPairing,
    backToSelection,
  }
}
