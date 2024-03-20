<script setup>
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import { CATEGORIES } from '@/utils/const'
  import { defineProps } from 'vue'

  const props = defineProps(['onCategoryChange', 'activeCategory'])
</script>

<template>
  <ButtonComponent
    type="lucid"
    v-for="category of CATEGORIES"
    :key="category"
    :class="['category', props.activeCategory && 'category_active']"
  >
    {{ category }}
  </ButtonComponent>
  <ButtonComponent type="lucid">Еще</ButtonComponent>
</template>

<style lang="scss" scoped>
  .category {
    font-size: 14px;
    &_active {
      font-weight: bold;
    }
  }
</style>
