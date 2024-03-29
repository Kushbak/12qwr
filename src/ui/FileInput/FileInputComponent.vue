<script setup>
  import { defineProps, defineEmits } from 'vue'
  import { loadImg } from '@/assets/img'
  import { ERROR_MESSAGES } from '@/utils/const'

  const props = defineProps(['placeholder', 'error', 'class'])
  const emit = defineEmits(['change'])
</script>

<template>
  <label :class="['input__container', props.class]">
    <img :src="loadImg" />
    <p>{{ props.placeholder }}</p>
    <input @change="emit('change', $event.target.files[0])" type="file" class="input_hide" accept=".jpg, .jpeg, .png" />
  </label>
  <p class="error" v-if="props.error">{{ ERROR_MESSAGES[error] || error }}</p>
</template>

<style lang="scss" scoped>
  .input {
    &__container {
      background-color: var(--color-white-1);
      border-radius: 12px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 8px;
    }

    &_hide {
      display: none;
    }
  }
</style>
