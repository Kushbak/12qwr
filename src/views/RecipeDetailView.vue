<script setup>
  import { computed, onMounted } from 'vue'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import { useRoute } from 'vue-router'
  import { formatTime } from '@/utils'
  import { bookmark, clock, comment, emptyAvatar, star } from '@/assets/img'
  import { MODAL_KEYS } from '@/utils/const'
  import ButtonComponentVue from '@/ui/Button/ButtonComponent.vue'

  const route = useRoute()
  const recipe = computed(() => store.state.recipes.recipeDetails)
  const user = computed(() => store.state.user)

  const handleSaveClick = async () => {
    // todo make `withAuth` hof to open login modal
    if (!user.value.userData) {
      store.commit('openModal', { modalName: MODAL_KEYS.LOGIN })
      return
    }
    // todo add reactive changing of layout for bookmarks
    await store.dispatch(RECIPES_ACTIONS.BOOKMARK_RECIPE, {
      recipe: recipe.value.id,
      is_bookmarked: !recipe.value.is_bookmarked,
    })
  }

  onMounted(() => {
    store.dispatch(RECIPES_ACTIONS.GET_RECIPE_BY_ID, route.params.id)
  })
</script>
<!-- todo refactor layout -->
<template>
  <div v-if="recipe" class="recipe">
    <div class="recipe__category">{{ recipe.category.name }}</div>
    <div class="recipe__title">{{ recipe.name }}</div>
    <div class="recipe__author">
      <img :src="recipe.user.avatar || emptyAvatar" alt="" />
      {{ recipe.user.username }}
    </div>
    <!-- todo make meta ui component -->
    <div class="recipe__meta">
      <p class="recipe__metaItem">
        <img class="recipe__metaImg" :src="star" /> Рейтинг:
        {{ recipe.avg_rating ?? 0 }}
      </p>
      <p class="recipe__metaItem">Ингредиентов: {{ recipe.ingredients_count }}</p>
      <p class="recipe__metaItem"><img class="recipe__metaImg" :src="clock" />{{ formatTime(recipe.cooking_time) }}</p>
      <p class="recipe__metaItem"><img class="recipe__metaImg" :src="comment" />29</p>
      <ButtonComponentVue type="lucid" class="recipe__bookmark" :onClick="handleSaveClick">
        <img :src="bookmark" />
        {{ recipe.is_bookmarked ? 'Сохранено' : 'Сохранить рецепт' }}
      </ButtonComponentVue>
    </div>
    <iframe height="360" width="100%" :src="recipe.cooking_url" />
    <p class="recipe__description">{{ recipe.description }}</p>
    <img class="recipe__img" :src="recipe.image.file" :alt="recipe.name" />
    <div class="recipe__ingredients">
      <h4 class="recipe__subtitle">Ингредиенты: {{ recipe.ingredients_count }}</h4>
      <ul>
        <li v-for="ingredient of recipe.ingredients" :key="ingredient.id">
          {{ ingredient.name }} - {{ ingredient.amount }}
        </li>
      </ul>
    </div>
    <div class="recipe__cooking">
      <h4 class="recipe__subtitle">Приготовление:</h4>
      <pre class="recipe__description"> {{ recipe.cooking_description }}</pre>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>

<style lang="scss" scoped>
  .recipe {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 20px 0;
    &__category {
      color: var(--color-main);
      font-size: 18px;
    }
    &__title {
      color: var(--color-dark);
      font-size: 32px;
      margin-top: 4px;
      margin-bottom: 8px;
    }
    &__subtitle {
      font-size: 20px;
      color: var(--color-dark);
      margin-bottom: 16px;
    }
    &__author {
      width: 100%;
      color: var(--color-dark);
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-right: 8px;
        max-width: 32px;
        width: 100%;
      }
    }
    &__description {
      font-size: 16px;
      color: var(--color-dark);
      margin: 32px 0;
      white-space: pre-wrap;
      font-family: inherit;
    }
    &__meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      margin-bottom: 24px;
      margin-top: 12px;
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
    &__img {
      width: 100%;
      object-fit: cover;
      height: 380px;
      border-radius: 12px;
    }
    &__ingredients {
      width: 100%;
      li {
        margin-bottom: 8px;
        font-size: 16px;
        color: var(--color-dark);
      }
    }
  }
</style>
