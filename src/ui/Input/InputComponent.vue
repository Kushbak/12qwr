<script setup>
  import { ERROR_MESSAGES } from '@/utils/const'
  import { defineModel, defineProps } from 'vue'

  const props = defineProps([
    'class',
    'placeholder',
    'onChange',
    'type',
    'error',
  ])
  const modelValue = defineModel()
</script>

<template>
  <div :class="['input__container', props.class]">
    <input
      :placeholder="placeholder"
      :class="['input', props.error && 'input_error']"
      v-model="modelValue"
      :type="props.type || 'text'"
      @change="props.onChange"
    />
    <p class="error" v-if="props.error">{{ ERROR_MESSAGES[error] || error }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .input {
    background-color: #f1f1f1;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    width: 100%;
    &:focus {
      outline: 1px solid var(--color-main);
      caret-color: var(--color-main);
    }

    &_error {
      border: 1px solid var(--color-error);
    }

    &__container {
      margin-bottom: 12px;
    }
  }

  .error {
    color: var(--color-error);
    font-size: 14px;
  }
</style>
