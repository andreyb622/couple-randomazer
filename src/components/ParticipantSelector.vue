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
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <section
        class="rounded-xl p-3 flex flex-col gap-2"
        style="background-color: var(--tg-secondary-bg); color: var(--tg-text)"
      >
        <h2 class="font-semibold text-base">👩 Девушки</h2>
        <p class="text-xs" style="color: var(--tg-hint)">Нажмите на имя, чтобы выбрать</p>

        <ul v-if="poolGirls.length > 0" class="flex flex-col gap-1.5">
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

        <p v-else class="text-sm text-center py-2" style="color: var(--tg-hint)">
          Все выбраны
        </p>

        <AddParticipantInput
          placeholder="Имя девушки"
          :existing-names="allPoolGirls"
          @add="emit('addGirl', $event)"
        />
      </section>

      <section
        class="rounded-xl p-3 flex flex-col gap-2"
        style="background-color: var(--tg-secondary-bg); color: var(--tg-text)"
      >
        <h2 class="font-semibold text-base">👨 Парни</h2>
        <p class="text-xs" style="color: var(--tg-hint)">Нажмите на имя, чтобы выбрать</p>

        <ul v-if="poolBoys.length > 0" class="flex flex-col gap-1.5">
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

        <p v-else class="text-sm text-center py-2" style="color: var(--tg-hint)">
          Все выбраны
        </p>

        <AddParticipantInput
          placeholder="Имя парня"
          :existing-names="allPoolBoys"
          @add="emit('addBoy', $event)"
        />
      </section>
    </div>

    <section
      class="rounded-xl p-3 flex flex-col gap-3"
      style="background-color: var(--tg-secondary-bg); color: var(--tg-text)"
    >
      <h2 class="font-semibold text-base">Участники</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <h3 class="text-sm font-medium mb-1.5">👩 Девушки</h3>
          <ul v-if="selectedGirls.length > 0" class="flex flex-col gap-1.5">
            <li
              v-for="(name, index) in selectedGirls"
              :key="`selected-girl-${name}-${index}`"
              class="participant-item flex items-center justify-between rounded-lg px-3 py-2 text-sm"
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
          <p v-else class="text-sm py-1" style="color: var(--tg-hint)">Пока никого не выбрано</p>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-1.5">👨 Парни</h3>
          <ul v-if="selectedBoys.length > 0" class="flex flex-col gap-1.5">
            <li
              v-for="(name, index) in selectedBoys"
              :key="`selected-boy-${name}-${index}`"
              class="participant-item flex items-center justify-between rounded-lg px-3 py-2 text-sm"
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
          <p v-else class="text-sm py-1" style="color: var(--tg-hint)">Пока никого не выбрано</p>
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
