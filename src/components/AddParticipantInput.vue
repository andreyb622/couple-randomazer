<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  placeholder: string
  existingNames: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  add: [name: string]
}>()

const newName = ref('')
const errorMessage = ref('')
const canAdd = computed(() => newName.value.trim().length > 0)

function handleAdd(): void {
  const trimmed = newName.value.trim()

  if (!trimmed) {
    errorMessage.value = 'Введите имя'
    return
  }

  if (props.existingNames.some((name) => name.toLowerCase() === trimmed.toLowerCase())) {
    errorMessage.value = 'Такое имя уже есть'
    return
  }

  emit('add', trimmed)
  newName.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <div class="add-input-group">
    <div class="add-input-row">
      <input
        v-model="newName"
        type="text"
        class="participant-add-input"
        :placeholder="placeholder"
        @keyup.enter="handleAdd"
      />
      <button
        type="button"
        class="participant-add-btn"
        :disabled="!canAdd"
        @click="handleAdd"
      >
        +
      </button>
    </div>
    <p v-if="errorMessage" class="text-error">{{ errorMessage }}</p>
  </div>
</template>
