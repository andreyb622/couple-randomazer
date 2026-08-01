<script setup lang="ts">
import type { Pair } from '../composables/usePairRandomizer'

interface Props {
  pairs: Pair[]
}

defineProps<Props>()
</script>

<template>
  <section v-if="pairs.length > 0" class="card">
    <h2 class="history-title">История пар</h2>

    <TransitionGroup name="pair" tag="ol" class="list-stack">
      <li
        v-for="(pair, index) in pairs"
        :key="`${pair.girl}-${pair.boy}-${index}`"
        class="history-row"
      >
        <span class="history-index">{{ index + 1 }}.</span>
        <span>{{ pair.girl }} + {{ pair.boy }}</span>
      </li>
    </TransitionGroup>
  </section>

  <section v-else class="history-empty">
    Пары пока не сформированы
  </section>
</template>
