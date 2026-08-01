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
  <section class="card card--stack-lg">
    <h2 class="card__title">Участники</h2>

    <div class="two-columns">
      <div>
        <h3 class="card__subtitle">👩 Девушки</h3>
        <ul v-if="girls.length > 0" class="list-stack">
          <li
            v-for="(name, index) in girls"
            :key="`remaining-girl-${name}-${index}`"
            class="participant-row"
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
        <p v-else class="empty-hint--inline">Все в парах</p>

        <AddParticipantInput
          placeholder="Имя девушки"
          :existing-names="allGirls"
          @add="emit('addGirl', $event)"
        />
      </div>

      <div>
        <h3 class="card__subtitle">👨 Парни</h3>
        <ul v-if="boys.length > 0" class="list-stack">
          <li
            v-for="(name, index) in boys"
            :key="`remaining-boy-${name}-${index}`"
            class="participant-row"
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
        <p v-else class="empty-hint--inline">Все в парах</p>

        <AddParticipantInput
          placeholder="Имя парня"
          :existing-names="allBoys"
          @add="emit('addBoy', $event)"
        />
      </div>
    </div>
  </section>
</template>
