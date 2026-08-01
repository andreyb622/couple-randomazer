<script setup lang="ts">
import AddParticipantInput from './AddParticipantInput.vue'

interface Props {
  girls: string[]
  boys: string[]
  allGirls: string[]
  allBoys: string[]
}

defineProps<Props>()

const emit = defineEmits<{
  addGirl: [name: string]
  addBoy: [name: string]
  removeGirl: [index: number]
  removeBoy: [index: number]
}>()
</script>

<template>
  <section
    class="rounded-xl p-3 flex flex-col gap-3"
    style="background-color: var(--tg-secondary-bg); color: var(--tg-text)"
  >
    <h2 class="font-semibold text-base">Участники</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <h3 class="text-sm font-medium mb-1.5">👩 Девушки</h3>
        <ul v-if="girls.length > 0" class="flex flex-col gap-1.5">
          <li
            v-for="(name, index) in girls"
            :key="`remaining-girl-${name}-${index}`"
            class="participant-item flex items-center justify-between rounded-lg px-3 py-2 text-sm"
          >
            <span>{{ name }}</span>
            <button
              type="button"
              class="participant-remove-btn"
              aria-label="Удалить участника"
              @click="emit('removeGirl', index)"
            >
              ✕
            </button>
          </li>
        </ul>
        <p v-else class="text-sm py-1" style="color: var(--tg-hint)">Все в парах</p>

        <AddParticipantInput
          placeholder="Имя девушки"
          :existing-names="allGirls"
          @add="emit('addGirl', $event)"
        />
      </div>

      <div>
        <h3 class="text-sm font-medium mb-1.5">👨 Парни</h3>
        <ul v-if="boys.length > 0" class="flex flex-col gap-1.5">
          <li
            v-for="(name, index) in boys"
            :key="`remaining-boy-${name}-${index}`"
            class="participant-item flex items-center justify-between rounded-lg px-3 py-2 text-sm"
          >
            <span>{{ name }}</span>
            <button
              type="button"
              class="participant-remove-btn"
              aria-label="Удалить участника"
              @click="emit('removeBoy', index)"
            >
              ✕
            </button>
          </li>
        </ul>
        <p v-else class="text-sm py-1" style="color: var(--tg-hint)">Все в парах</p>

        <AddParticipantInput
          placeholder="Имя парня"
          :existing-names="allBoys"
          @add="emit('addBoy', $event)"
        />
      </div>
    </div>
  </section>
</template>
