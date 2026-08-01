<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import NameList from './components/NameList.vue'
import PairGenerator from './components/PairGenerator.vue'
import PairHistory from './components/PairHistory.vue'
import { usePairRandomizer } from './composables/usePairRandomizer'
import { useTelegramApp } from './composables/useTelegramApp'

const {
  girls,
  boys,
  pairs,
  canGenerate,
  remainingCount,
  generatePair,
  reset,
  addName,
  removeName,
} = usePairRandomizer()

const { hapticImpact } = useTelegramApp()

function handleGenerate(): void {
  const pair = generatePair()

  if (pair) {
    hapticImpact('medium')
  }
}

function handleAddGirl(name: string): void {
  addName('girls', name)
}

function handleAddBoy(name: string): void {
  addName('boys', name)
}

function handleRemoveGirl(index: number): void {
  removeName('girls', index)
}

function handleRemoveBoy(index: number): void {
  removeName('boys', index)
}
</script>

<template>
  <div class="min-h-dvh flex flex-col px-4 pb-6 max-w-lg mx-auto">
    <AppHeader :remaining-count="remainingCount" />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <NameList
        title="👩 Девушки"
        list-type="girls"
        :names="girls"
        @add="handleAddGirl"
        @remove="handleRemoveGirl"
      />
      <NameList
        title="👨 Парни"
        list-type="boys"
        :names="boys"
        @add="handleAddBoy"
        @remove="handleRemoveBoy"
      />
    </div>

    <div class="mb-4">
      <PairGenerator :can-generate="canGenerate" @generate="handleGenerate" />
    </div>

    <div class="mb-4">
      <PairHistory :pairs="pairs" />
    </div>

    <button
      type="button"
      class="btn btn-outline w-full"
      @click="reset"
    >
      ↺ Сбросить
    </button>
  </div>
</template>
