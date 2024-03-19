<script setup>
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import { defineProps } from 'vue'

  const props = defineProps(['onCategoryChange', 'activeCategory'])

  const categories = [
    'Все рецепты',
    'Выпечка и десерты',
    'Бульоны',
    'Закуски',
    'Напитки',
    'Основные блюда',
    'Паста и пицца',
    'Ризотто',
    'Салаты',
  ]
</script>

<template>
  <ButtonComponent
    type="lucid"
    v-for="category of categories"
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
