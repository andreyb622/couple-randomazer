<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  names: string[]
  listType: 'girls' | 'boys'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  add: [name: string]
  remove: [index: number]
}>()

const newName = ref('')
const errorMessage = ref('')

function handleAdd(): void {
  const trimmed = newName.value.trim()

  if (!trimmed) {
    errorMessage.value = 'Введите имя'
    return
  }

  if (props.names.some((name) => name.toLowerCase() === trimmed.toLowerCase())) {
    errorMessage.value = 'Такое имя уже есть'
    return
  }

  emit('add', trimmed)
  newName.value = ''
  errorMessage.value = ''
}

function handleRemove(index: number): void {
  emit('remove', index)
}
</script>

<template>
  <section class="card card--stack">
    <h2 class="card__title">{{ title }}</h2>

    <ul class="list-stack">
      <li
        v-for="(name, index) in names"
        :key="`${listType}-${name}-${index}`"
        class="participant-row"
      >
        <span>{{ name }}</span>
        <button
          type="button"
          class="participant-remove-btn"
          aria-label="Удалить"
          @click="handleRemove(index)"
        >
          ✕
        </button>
      </li>
    </ul>

    <p v-if="names.length === 0" class="empty-hint">Список пуст</p>

    <div class="add-input-row">
      <input
        v-model="newName"
        type="text"
        class="participant-add-input"
        :placeholder="listType === 'girls' ? 'Имя девушки' : 'Имя парня'"
        @keyup.enter="handleAdd"
      />
      <button type="button" class="participant-add-btn" @click="handleAdd">
        +
      </button>
    </div>

    <p v-if="errorMessage" class="text-error">{{ errorMessage }}</p>
  </section>
</template>
