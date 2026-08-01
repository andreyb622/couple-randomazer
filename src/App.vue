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

const { isTelegram, hapticImpact, hapticSelection } = useTelegramApp()

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

function handleSelectGirl(index: number): void {
  selectGirl(index)
  hapticSelection()
}

function handleSelectBoy(index: number): void {
  selectBoy(index)
  hapticSelection()
}

function handleDeselectGirl(index: number): void {
  deselectGirl(index)
  hapticImpact('light')
}

function handleDeselectBoy(index: number): void {
  deselectBoy(index)
  hapticImpact('light')
}

function handleAddPoolGirl(name: string): void {
  if (addToPool('girls', name)) {
    hapticImpact('light')
  }
}

function handleAddPoolBoy(name: string): void {
  if (addToPool('boys', name)) {
    hapticImpact('light')
  }
}

function handleAddParticipantGirl(name: string): void {
  if (addParticipant('girls', name)) {
    hapticImpact('light')
  }
}

function handleAddParticipantBoy(name: string): void {
  if (addParticipant('boys', name)) {
    hapticImpact('light')
  }
}

function handleRemoveParticipantGirl(index: number): void {
  removeParticipant('girls', index)
  hapticImpact('light')
}

function handleRemoveParticipantBoy(index: number): void {
  removeParticipant('boys', index)
  hapticImpact('light')
}

function handleResetSelection(): void {
  resetSelection()
  hapticImpact('light')
}

function handleResetPairing(): void {
  resetPairing()
  hapticImpact('light')
}

function handleBackToSelection(): void {
  backToSelection()
  hapticImpact('light')
}
</script>

<template>
  <div class="app">
    <p v-if="!isTelegram" class="browser-hint">
      Откройте приложение через Telegram для полного опыта
    </p>

    <AppHeader :phase="phase" :remaining-count="remainingCount" />

    <ParticipantSelector
      v-if="phase === 'selection'"
      :pool-girls="poolGirls"
      :pool-boys="poolBoys"
      :selected-girls="selectedGirls"
      :selected-boys="selectedBoys"
      :can-confirm="canConfirmSelection"
      :can-reset="canResetSelection"
      @select-girl="handleSelectGirl"
      @select-boy="handleSelectBoy"
      @deselect-girl="handleDeselectGirl"
      @deselect-boy="handleDeselectBoy"
      @confirm="handleConfirmSelection"
      @reset="handleResetSelection"
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
          @click="handleResetPairing"
        >
          ↺ Сбросить
        </button>

        <button
          type="button"
          class="outline-btn"
          @click="handleBackToSelection"
        >
          ← Назад к выбору
        </button>
      </div>
    </template>
  </div>
</template>
