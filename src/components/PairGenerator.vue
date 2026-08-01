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
    class="confirm-btn"
    :disabled="!canGenerate"
    @click="emit('generate')"
  >
    🎲 Сформировать пару
  </button>
</template>
