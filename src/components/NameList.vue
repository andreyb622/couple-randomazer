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
  <section
    class="rounded-xl p-3 flex flex-col gap-2"
    style="background-color: var(--tg-secondary-bg)"
  >
    <h2 class="font-semibold text-base">{{ title }}</h2>

    <ul class="flex flex-col gap-1.5">
      <li
        v-for="(name, index) in names"
        :key="`${listType}-${name}-${index}`"
        class="flex items-center justify-between rounded-lg px-3 py-2 text-sm"
        style="background-color: var(--tg-bg)"
      >
        <span>{{ name }}</span>
        <button
          type="button"
          class="btn btn-ghost btn-xs btn-circle"
          aria-label="Удалить"
          @click="handleRemove(index)"
        >
          ✕
        </button>
      </li>
    </ul>

    <p v-if="names.length === 0" class="text-sm text-center py-2" style="color: var(--tg-hint)">
      Список пуст
    </p>

    <div class="flex gap-2 mt-1">
      <input
        v-model="newName"
        type="text"
        class="input input-sm input-bordered flex-1"
        :placeholder="listType === 'girls' ? 'Имя девушки' : 'Имя парня'"
        @keyup.enter="handleAdd"
      />
      <button type="button" class="btn btn-sm btn-primary" @click="handleAdd">
        +
      </button>
    </div>

    <p v-if="errorMessage" class="text-xs text-error">{{ errorMessage }}</p>
  </section>
</template>
