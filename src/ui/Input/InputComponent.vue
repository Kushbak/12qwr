<script setup>
  import { ERROR_MESSAGES_LOCALE } from '@/utils/const'
  import { defineModel, defineProps, defineEmits } from 'vue'

  const props = defineProps(['class', 'placeholder', 'onChange', 'type', 'error', 'noMargin', 'maxLength', 'maxNumber'])
  const emit = defineEmits('input')
  const modelValue = defineModel()

  const handleChange = (e) => {
    const value = e.target.value
    emit('input', value)
  }
</script>

<template>
  <div :class="['input__container', props.noMargin && 'input__container_noMargin', props.class]">
    <input
      :placeholder="placeholder"
      :class="['input', props.error && 'input_error']"
      v-model="modelValue"
      :type="props.type || 'text'"
      @input="handleChange"
    />
    <p class="error" v-if="props.error">{{ ERROR_MESSAGES_LOCALE[error] || error }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .input {
    background-color: var(--color-white-1);
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    width: 100%;
    height: 100%;
    &:focus {
      outline: 1px solid var(--color-main);
      caret-color: var(--color-main);
    }

    &_error {
      border: 1px solid var(--color-error);
    }

    &__container {
      margin-bottom: 12px;
      &_noMargin {
        margin-bottom: 0;
      }
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    &[type='number'] {
      -moz-appearance: textfield; /* Firefox */
    }
  }

  .error {
    color: var(--color-error);
    font-size: 14px;
  }
</style>
