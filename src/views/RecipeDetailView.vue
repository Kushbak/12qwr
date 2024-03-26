<script setup>
  import { computed, onMounted } from 'vue'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import { useRoute } from 'vue-router'
  import { formatTime } from '@/utils'
  import { bookmark, clock, comment, emptyAvatar, star } from '@/assets/img'
  import { MODAL_KEYS } from '@/utils/const'
  import ButtonComponentVue from '@/ui/Button/ButtonComponent.vue'
  import InputComponent from '@/ui/Input/InputComponent.vue'

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
    <div class="recipe__rating">
      <div class="recipe__rate">
        <p>Оцените рецепт, если опробовали его:</p>
        <div class="recipe__myRate">
          <img :src="star" alt="" />
          <img :src="star" alt="" />
          <img :src="star" alt="" />
          <img :src="star" alt="" />
          <img :src="star" alt="" />
          <p>Ваша оценка</p>
        </div>
      </div>
      <div class="recipe__avgRateBlock">
        <p class="recipe__avgRate">
          <img :src="star" alt="" />
          {{ recipe.avg_rating }}
        </p>
        <p>Средняя оценка</p>
        <p>Всего голосов: {{ recipe.avg_rating_count }}</p>
      </div>
    </div>
    <div class="recipe__comments">
      <h4 class="recipe__subtitle">Комментарии({{ recipe.comments_count }})</h4>
      <div class="comment" v-for="comment of recipe.comments" :key="comment.id">
        <div class="comment__author">
          <!-- todo split avatar to component -->
          <img :src="comment.user.avatar.file || emptyAvatar" alt="avatar" class="comment__avatar" />
          <div class="comment__meta">
            <p class="comment__authorName">{{ comment.user.username }}</p>
            <p class="comment__date">{{ comment.created_at }}</p>
          </div>
        </div>
        <p class="comment__text">{{ comment.text }}</p>
      </div>
      <div class="comment__inputBlock">
        <InputComponent class="comment__input" placeholder="Добавить комментарий" />
        <ButtonComponentVue>Отправить</ButtonComponentVue>
      </div>
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
    color: var(--color-dark);
    &__category {
      color: var(--color-main);
      font-size: 18px;
    }
    &__title {
      font-size: 32px;
      margin-top: 4px;
      margin-bottom: 8px;
    }
    &__subtitle {
      font-size: 20px;
      margin-bottom: 16px;
    }
    &__author {
      width: 100%;
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
      }
    }
    &__rating {
      padding: 32px 0;
      border-top: 1px solid var(--color-white-2);
      border-bottom: 1px solid var(--color-white-2);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__myRate {
      display: flex;
      margin-top: 8px;
      gap: 4px;
    }
    &__avgRateBlock {
      text-align: right;
      font-size: 14px;
    }
    &__avgRate {
      font-size: 32px;
      font-weight: bold;
    }
    &__comments {
      width: 100%;
      margin-bottom: 120px;
    }
  }

  .comment {
    &__inputBlock {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-top: 36px;
    }
    &__input {
      margin-bottom: 0;
      width: 100%;
    }
  }
</style>
