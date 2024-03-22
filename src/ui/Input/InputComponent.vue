<script setup>
  import { defineModel, defineProps } from 'vue'

  const props = defineProps(['class', 'placeholder', 'onChange', 'type'])
  const modelValue = defineModel()
</script>

<template>
  <input
    :placeholder="placeholder"
    :class="['input', props.class]"
    v-model="modelValue"
    :type="props.type || 'text'"
    @change="props.onChange"
  />
</template>

<style lang="scss" scoped>
  .input {
    background-color: #f1f1f1;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    &:focus {
      outline: 1px solid var(--color-main);
      caret-color: var(--color-main);
    }
  }
</style>
