<script setup>
  import { computed, defineProps } from 'vue'
  import ButtonComponentVue from '@/ui/Button/ButtonComponent.vue'
  import { star, clock, comment, bookmark } from '@/assets/img'
  import { formatTime } from '@/utils'
  import store from '@/store'
  import { MODAL_KEYS } from '@/utils/const'

  defineProps(['recipe'])

  const user = computed(() => store.state.user)

  const handleSaveClick = () => {
    // todo make `withAuth` hof to open login modal
    if (!user.value.userData) {
      store.commit('openModal', { modalName: MODAL_KEYS.LOGIN })
      return
    }
    console.log('saved!')
  }
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
      <div class="recipe__meta">
        <p class="recipe__metaItem">
          <img class="recipe__metaImg" :src="star" /> Рейтинг:
          {{ recipe.avg_rating ?? 0 }}
        </p>
        <p class="recipe__metaItem">
          Ингредиентов: {{ recipe.ingredients_count }}
        </p>
        <p class="recipe__metaItem">
          <img class="recipe__metaImg" :src="clock" />{{
            formatTime(recipe.cooking_time)
          }}
        </p>
        <p class="recipe__metaItem">
          <img class="recipe__metaImg" :src="comment" />29
        </p>
      </div>
      <p class="recipe__description">
        {{ recipe.description }}
      </p>
      <div class="recipe__actions">
        <ButtonComponentVue
          type="lucid"
          class="recipe__bookmark"
          :onClick="handleSaveClick"
        >
          <img :src="bookmark" />
          Сохранить рецепт</ButtonComponentVue
        >
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
    &__meta {
      display: flex;
      align-items: center;
      gap: 24px;
    }
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
