<script setup>
  import { defineProps } from 'vue'
  import RecipeMeta from '@/ui/RecipeMeta/RecipeMeta.vue'
  import BookmarkRecipe from '@/components/BookmarkRecipe/BookmarkRecipe.vue'

  defineProps(['recipe'])
</script>

<template>
  <div class="recipe">
    <div class="recipe__imgBlock">
      <img class="recipe__img" :src="recipe.image.file" />
    </div>
    <div class="recipe__info">
      <p class="recipe__category">
        {{ recipe.category.name }}
      </p>
      <h4 class="recipe__title">{{ recipe.name }}</h4>
      <p class="recipe__author">Автор: {{ recipe.user.username }}</p>
      <RecipeMeta :recipe="recipe" />
      <p class="recipe__description">{{ recipe.description }}</p>
      <div>
        <BookmarkRecipe :recipe="recipe" />
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
      overflow: hidden;
      width: 200px;
    }
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
    &__info {
      width: 70%;
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
