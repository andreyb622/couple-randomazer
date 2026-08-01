<script setup lang="ts">
interface Props {
  remainingCount: number
}

defineProps<Props>()
</script>

<template>
  <header class="text-center py-4 px-4">
    <h1 class="text-2xl font-bold">💑 Рандомайзер пар</h1>
    <p class="text-sm mt-1" style="color: var(--tg-hint)">
      Осталось: {{ remainingCount }} {{ remainingCount === 1 ? 'пара' : 'пар' }}
    </p>
  </header>
</template>
