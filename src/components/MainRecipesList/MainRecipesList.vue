<script setup>
  import { computed, defineProps, onMounted } from 'vue'
  import RecipeCard from '@/ui/RecipeCard/RecipeCard.vue'
  import ButtonComponentVue from '@/ui/Button/ButtonComponent.vue'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import { ORDER_BY } from '@/utils/const'

  const props = defineProps(['isSearch', 'title', 'data'])
  const recipes = computed(() => store.state.recipes)
  const isSearch = computed(() => store.getters.isSearch)

  const onOrderingClick = (newOrdering) => {
    const data = recipes.value.filters.ordering === newOrdering ? null : newOrdering
    store.dispatch(RECIPES_ACTIONS.GET_ORDERED_RECIPES, data)
  }

  onMounted(() => {
    if (!props.data) {
      store.dispatch(RECIPES_ACTIONS.GET_ALL_RECIPES)
    }
  })
</script>

<template>
  <p v-if="isSearch" class="recipesList__searchResultText">Результаты поиска по запросу</p>
  <h4 class="recipesList__title">
    {{ isSearch ? recipes.filters.search : recipes.title }}
  </h4>
  <div class="recipesList__info">
    <p>{{ isSearch ? 'Найдено рецептов' : 'Рецептов' }}: {{ recipes.totalCount }}</p>
    <div class="recipesList__sort">
      Сортировать:
      <ButtonComponentVue
        :class="[
          'recipesList__sortBtn',
          recipes.filters.ordering === ORDER_BY.AVG_RATING_DESC && 'recipesList__sortBtn_active',
        ]"
        btnType="lucid"
        @click="() => onOrderingClick(ORDER_BY.AVG_RATING_DESC)"
      >
        по рейтингу
      </ButtonComponentVue>
      <ButtonComponentVue
        :class="[
          'recipesList__sortBtn',
          recipes.filters.ordering === ORDER_BY.COMMENTS_COUNT_DESC && 'recipesList__sortBtn_active',
        ]"
        btnType="lucid"
        @click="() => onOrderingClick(ORDER_BY.COMMENTS_COUNT_DESC)"
      >
        по кол-ву комментариев
      </ButtonComponentVue>
    </div>
  </div>
  <div class="recipesList__list">
    <template v-for="recipe of recipes.data" :key="recipe.id">
      <router-link :to="`/recipe/${recipe.id}`">
        <RecipeCard :recipe="recipe" />
      </router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .recipesList {
    &__title {
      font-size: 24px;
    }
    &__searchResultText {
      font-size: 14px;
      color: var(--color-dark);
      margin-bottom: 6px;
    }
    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__sortBtn {
      font-size: 14px;
      &_active {
        font-weight: bold;
      }
    }
  }
</style>
