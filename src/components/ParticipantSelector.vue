<script setup lang="ts">
import { computed } from 'vue'
import AddParticipantInput from './AddParticipantInput.vue'

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

    <section class="card card--stack-lg">
      <h2 class="card__title">Участники</h2>

      <div class="two-columns">
        <div>
          <h3 class="card__subtitle">👩 Девушки</h3>
          <ul v-if="selectedGirls.length > 0" class="list-stack">
            <li
              v-for="(name, index) in selectedGirls"
              :key="`selected-girl-${name}-${index}`"
              class="participant-row"
            >
              <span>{{ name }}</span>
              <button
                type="button"
                class="participant-remove-btn"
                aria-label="Убрать из участников"
                @click="emit('deselectGirl', index)"
              >
                ✕
              </button>
            </li>
          </ul>
          <p v-else class="empty-hint--inline">Пока никого не выбрано</p>
        </div>

        <div>
          <h3 class="card__subtitle">👨 Парни</h3>
          <ul v-if="selectedBoys.length > 0" class="list-stack">
            <li
              v-for="(name, index) in selectedBoys"
              :key="`selected-boy-${name}-${index}`"
              class="participant-row"
            >
              <span>{{ name }}</span>
              <button
                type="button"
                class="participant-remove-btn"
                aria-label="Убрать из участников"
                @click="emit('deselectBoy', index)"
              >
                ✕
              </button>
            </li>
          </ul>
          <p v-else class="empty-hint--inline">Пока никого не выбрано</p>
        </div>
      </div>
    </section>

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
