<script setup lang="ts">
import type { Pair } from '../composables/usePairRandomizer'

interface Props {
  pairs: Pair[]
}

defineProps<Props>()
</script>

<template>
  <section
    v-if="pairs.length > 0"
    class="rounded-xl p-3"
    style="background-color: var(--tg-secondary-bg); color: var(--tg-text)"
  >
    <h2 class="font-semibold text-base mb-2">История пар</h2>

    <TransitionGroup name="pair" tag="ol" class="flex flex-col gap-1.5">
      <li
        v-for="(pair, index) in pairs"
        :key="`${pair.girl}-${pair.boy}-${index}`"
        class="participant-item rounded-lg px-3 py-2 text-sm"
      >
        <span class="font-medium">{{ index + 1 }}.</span>
        {{ pair.girl }} + {{ pair.boy }}
      </li>
    </TransitionGroup>
  </section>

  <section
    v-else
    class="rounded-xl p-4 text-center text-sm"
    style="background-color: var(--tg-secondary-bg); color: var(--tg-hint)"
  >
    Пары пока не сформированы
  </section>
</template>
