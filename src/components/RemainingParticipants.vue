<script setup lang="ts">
import ParticipantsPanel from './ParticipantsPanel.vue'

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
  <ParticipantsPanel
    :girls="girls"
    :boys="boys"
    :all-girls="allGirls"
    :all-boys="allBoys"
    empty-hint="Все в парах"
    remove-aria-label="Удалить участника"
    @remove-girl="emit('removeGirl', $event)"
    @remove-boy="emit('removeBoy', $event)"
    @add-girl="emit('addGirl', $event)"
    @add-boy="emit('addBoy', $event)"
  />
</template>
