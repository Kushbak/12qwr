<script setup>
  import { defineModel, defineProps } from 'vue'

  const props = defineProps(['className', 'placeholder'])
  const modelValue = defineModel()
</script>

<template>
  <input
    :placeholder="placeholder"
    :class="['input', props.className]"
    v-model="modelValue"
  />
</template>

<style lang="scss" scoped>
  .input {
    background-color: #f1f1f1;
    border-radius: 12px;
    padding: 8px 16px;
    font-size: 16px;
    border: none;
  }
</style>
