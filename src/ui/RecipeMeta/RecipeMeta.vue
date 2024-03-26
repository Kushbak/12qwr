<script setup>
  import { defineProps } from 'vue'
  import { clock, comment, star } from '@/assets/img'
  import { formatTime } from '@/utils'
  import BookmarkRecipe from '@/components/BookmarkRecipe/BookmarkRecipe.vue'

  const props = defineProps(['recipe', 'withSave'])
</script>

<template>
  <div class="recipeMeta">
    <p class="recipeMeta__metaItem">
      <img class="recipeMeta__metaImg" :src="star" /> Рейтинг:
      {{ recipe.avg_rating ?? 0 }}
    </p>
    <p class="recipeMeta__metaItem">Ингредиентов: {{ props.recipe.ingredients_count }}</p>
    <p class="recipeMeta__metaItem">
      <img class="recipeMeta__metaImg" :src="clock" />{{ formatTime(props.recipe.cooking_time) }}
    </p>
    <p class="recipeMeta__metaItem"><img class="recipeMeta__metaImg" :src="comment" />29</p>
    <BookmarkRecipe :recipe="recipe" v-if="props.withSave" />
  </div>
</template>

<style lang="scss" scoped>
  .recipeMeta {
    display: flex;
    align-items: center;
    gap: 24px;
    &__metaItem {
      display: flex;
      align-items: center;
    }
    &__metaImg {
      margin-right: 5px;
    }
    &__bookmark {
      border: 1px solid var(--color-dark);
      img {
        margin-right: 10px;
      }
    }
  }
</style>
