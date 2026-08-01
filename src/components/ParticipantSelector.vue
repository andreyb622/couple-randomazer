<script setup lang="ts">
import { computed } from 'vue'
import AddParticipantInput from './AddParticipantInput.vue'
import ParticipantsPanel from './ParticipantsPanel.vue'

interface Props {
  poolGirls: string[]
  poolBoys: string[]
  selectedGirls: string[]
  selectedBoys: string[]
  canConfirm: boolean
  canReset: boolean
}

const props = defineProps<Props>()

const confirmButtonLabel = computed(() => {
  if (props.canConfirm) {
    return 'Участники выбраны'
  }

  if (props.selectedGirls.length === 0 && props.selectedBoys.length === 0) {
    return 'Выберите девушку и парня'
  }

  if (props.selectedGirls.length === 0) {
    return 'Выберите девушку'
  }

  return 'Выберите парня'
})

const allPoolGirls = computed(() => [...props.poolGirls, ...props.selectedGirls])
const allPoolBoys = computed(() => [...props.poolBoys, ...props.selectedBoys])

const emit = defineEmits<{
  selectGirl: [index: number]
  selectBoy: [index: number]
  deselectGirl: [index: number]
  deselectBoy: [index: number]
  confirm: []
  reset: []
  addGirl: [name: string]
  addBoy: [name: string]
}>()
</script>

<template>
  <div class="selection-layout">
    <div class="two-columns">
      <section class="card card--stack">
        <h2 class="card__title">👩 Девушки</h2>
        <p class="card__hint">Нажмите на имя, чтобы выбрать</p>

        <ul v-if="poolGirls.length > 0" class="list-stack">
          <li v-for="(name, index) in poolGirls" :key="`pool-girl-${name}-${index}`">
            <button
              type="button"
              class="participant-pick-btn"
              @click="emit('selectGirl', index)"
            >
              {{ name }}
            </button>
          </li>
        </ul>

        <p v-else class="empty-hint">Все выбраны</p>

        <AddParticipantInput
          placeholder="Имя девушки"
          :existing-names="allPoolGirls"
          @add="emit('addGirl', $event)"
        />
      </section>

      <section class="card card--stack">
        <h2 class="card__title">👨 Парни</h2>
        <p class="card__hint">Нажмите на имя, чтобы выбрать</p>

        <ul v-if="poolBoys.length > 0" class="list-stack">
          <li v-for="(name, index) in poolBoys" :key="`pool-boy-${name}-${index}`">
            <button
              type="button"
              class="participant-pick-btn"
              @click="emit('selectBoy', index)"
            >
              {{ name }}
            </button>
          </li>
        </ul>

        <p v-else class="empty-hint">Все выбраны</p>

        <AddParticipantInput
          placeholder="Имя парня"
          :existing-names="allPoolBoys"
          @add="emit('addBoy', $event)"
        />
      </section>
    </div>

    <ParticipantsPanel
      :girls="selectedGirls"
      :boys="selectedBoys"
      :all-girls="allPoolGirls"
      :all-boys="allPoolBoys"
      empty-hint="Пока никого не выбрано"
      remove-aria-label="Убрать из участников"
      @remove-girl="emit('deselectGirl', $event)"
      @remove-boy="emit('deselectBoy', $event)"
      @add-girl="emit('addGirl', $event)"
      @add-boy="emit('addBoy', $event)"
    />

    <button
      type="button"
      class="confirm-btn"
      :disabled="!canConfirm"
      @click="emit('confirm')"
    >
      {{ confirmButtonLabel }}
    </button>

    <button
      type="button"
      class="reset-btn"
      :disabled="!canReset"
      @click="emit('reset')"
    >
      ↺ Сбросить
    </button>
  </div>
</template>
