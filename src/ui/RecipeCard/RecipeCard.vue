<script setup>
  import { defineProps } from 'vue'
  import ButtonComponentVue from '@/ui/Button/ButtonComponent.vue'
  import { star, clock, comment, loadImg } from '@/assets/img'
  import { formatTime } from '@/utils'

  defineProps(['recipe'])
</script>

<template>
  <div class="recipe">
    <div class="recipe__imgBlock">
      <img class="recipe__img" :src="loadImg" />
    </div>
    <div class="recipe__info">
      <p class="recipe__category">{{ recipe.category.name }}</p>
      <h4 class="recipe__title">{{ recipe.name }}</h4>
      <p class="recipe__author">Автор: {{ recipe.user.username }}</p>
      <div class="recipe__meta">
        <p><img :src="star" /> Рейтинг: {{ recipe.avg_rating }}</p>
        <p>Ингредиентов: {{ recipe.ingredients_count }}</p>
        <p><img :src="clock" />{{ formatTime(recipe.cooking_time) }}</p>
        <p><img :src="comment" />29</p>
      </div>
      <p class="recipe__description">
        {{ recipe.description }}
      </p>
      <div class="recipe__actions">
        <ButtonComponentVue type="lucid">Сохранить рецепт</ButtonComponentVue>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .recipe {
    display: flex;
    gap: 28px;
    margin: 20px 0;
    &__imgBlock {
      flex-basis: 24%;
    }
    &__img {
      width: 100%;
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 11px 0;
    }
    &__category {
      color: var(--color-main);
      font-size: 14px;
    }
    &__title {
      color: var(--color-dark);
      font-size: 24px;
    }
    &__author,
    &__description {
      width: 100%;
      color: var(--color-grey);
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
