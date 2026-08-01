<script setup lang="ts">
import type { AppPhase } from '../composables/usePairRandomizer'
import { pluralizePairs } from '../utils/pluralize'

interface Props {
  phase: AppPhase
  remainingCount: number
}

defineProps<Props>()
</script>

<template>
  <header class="app-header">
    <h1 class="app-header__title">👫 Рандомайзер пар</h1>
    <p v-if="phase === 'selection'" class="app-header__subtitle">
      Выберите, кто будет участвовать
    </p>
    <p v-else class="app-header__subtitle">
      Осталось: {{ remainingCount }} {{ pluralizePairs(remainingCount) }}
    </p>
  </header>
</template>
