<script setup>
  import { defineProps, onMounted, ref } from 'vue'
  import RecipeCard from '@/ui/RecipeCard/RecipeCard.vue'
  import { recipesApi } from '@/api'
  import ButtonComponentVue from '@/ui/Button/ButtonComponent.vue'

  const props = defineProps(['isSearch', 'title', 'data'])

  const recipes = ref([])
  const totalPages = ref(0)
  const totalCount = ref(0)

  onMounted(() => {
    if (!props.data) {
      recipesApi.getAllRecipes().then((res) => {
        recipes.value = res.data.list
        totalPages.value = res.data.total_pages
        totalCount.value = res.data.total_count
      })
    }
  })
</script>

<template>
  <p v-if="props.isSearch">Результаты поиска по запросу</p>
  <h4>{{ props.title }}</h4>
  <div class="recipesList__info">
    <p>
      {{ props.isSearch ? 'Найдено рецептов' : 'Рецептов' }}: {{ totalCount }}
    </p>
    <div class="recipesList__sort">
      Сортировать:
      <ButtonComponentVue class="recipesList__sortBtn" type="lucid"
        >по рейтингу</ButtonComponentVue
      >
      <ButtonComponentVue class="recipesList__sortBtn" type="lucid"
        >по кол-ву комментариев</ButtonComponentVue
      >
    </div>
  </div>
  <div class="recipesList__list">
    <template v-for="recipe of recipes" :key="recipe.id">
      <RecipeCard :recipe="recipe" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .recipesList {
    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__sortBtn {
      font-size: 14px;
    }
  }
</style>
