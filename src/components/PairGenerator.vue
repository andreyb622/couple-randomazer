<script setup lang="ts">
interface Props {
  canGenerate: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  generate: []
}>()
</script>

<template>
  <button
    type="button"
    class="btn btn-lg w-full font-semibold"
    style="background-color: var(--tg-button); color: var(--tg-button-text); border: none"
    :disabled="!canGenerate"
    @click="emit('generate')"
  >
    🎲 Сформировать пару
  </button>
</template>
