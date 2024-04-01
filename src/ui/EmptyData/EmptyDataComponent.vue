<script setup>
  import { EMPTY_TEXT_MAP } from '@/utils/const'
  import { defineProps } from 'vue'

  const props = defineProps(['height', 'textKey'])
</script>

<template>
  <div class="emptyData" :style="{ height: (props.height || '100') + 'px' }">
    <p class="emptyData__title">{{ EMPTY_TEXT_MAP[props.textKey].title }}</p>
    <p class="emptyData__text">{{ EMPTY_TEXT_MAP[props.textKey].text }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .emptyData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-grey);
    &__title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    &__text {
      font-size: 18px;
    }
  }
</style>
