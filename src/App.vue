<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import ParticipantSelector from './components/ParticipantSelector.vue'
import RemainingParticipants from './components/RemainingParticipants.vue'
import PairGenerator from './components/PairGenerator.vue'
import PairHistory from './components/PairHistory.vue'
import { usePairRandomizer } from './composables/usePairRandomizer'
import { useTelegramApp } from './composables/useTelegramApp'

const {
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
} = usePairRandomizer()

const { hapticImpact } = useTelegramApp()

function handleGenerate(): void {
  const pair = generatePair()

  if (pair) {
    hapticImpact('medium')
  }
}

function handleConfirmSelection(): void {
  if (confirmSelection()) {
    hapticImpact('light')
  }
}

function handleAddPoolGirl(name: string): void {
  addToPool('girls', name)
}

function handleAddPoolBoy(name: string): void {
  addToPool('boys', name)
}

function handleAddParticipantGirl(name: string): void {
  addParticipant('girls', name)
}

function handleAddParticipantBoy(name: string): void {
  addParticipant('boys', name)
}

function handleRemoveParticipantGirl(index: number): void {
  removeParticipant('girls', index)
}

function handleRemoveParticipantBoy(index: number): void {
  removeParticipant('boys', index)
}
</script>

<template>
  <div class="app">
    <AppHeader :phase="phase" :remaining-count="remainingCount" />

    <ParticipantSelector
      v-if="phase === 'selection'"
      :pool-girls="poolGirls"
      :pool-boys="poolBoys"
      :selected-girls="selectedGirls"
      :selected-boys="selectedBoys"
      :can-confirm="canConfirmSelection"
      :can-reset="canResetSelection"
      @select-girl="selectGirl"
      @select-boy="selectBoy"
      @deselect-girl="deselectGirl"
      @deselect-boy="deselectBoy"
      @confirm="handleConfirmSelection"
      @reset="resetSelection"
      @add-girl="handleAddPoolGirl"
      @add-boy="handleAddPoolBoy"
    />

    <template v-else>
      <div class="section-spacing">
        <RemainingParticipants
          :girls="girls"
          :boys="boys"
          :all-girls="selectedGirls"
          :all-boys="selectedBoys"
          @add-girl="handleAddParticipantGirl"
          @add-boy="handleAddParticipantBoy"
          @remove-girl="handleRemoveParticipantGirl"
          @remove-boy="handleRemoveParticipantBoy"
        />
      </div>

      <div class="section-spacing">
        <PairGenerator :can-generate="canGenerate" @generate="handleGenerate" />
      </div>

      <div class="section-spacing">
        <PairHistory :pairs="pairs" />
      </div>

      <div class="actions-group">
        <button
          type="button"
          class="reset-btn"
          :disabled="!canResetPairing"
          @click="resetPairing"
        >
          ↺ Сбросить
        </button>

        <button
          type="button"
          class="outline-btn"
          @click="backToSelection"
        >
          ← Назад к выбору
        </button>
      </div>
    </template>
  </div>
</template>
