<script setup>
  import { defineProps, onMounted, ref } from 'vue'
  import RecipeCard from '@/ui/RecipeCard/RecipeCard.vue'
  import { recipesApi } from '@/api'

  const props = defineProps(['isSearch', 'title', 'data', 'totalRecipes'])

  const recipes = ref([])

  onMounted(() => {
    if (!props.data) {
      recipesApi.getAllRecipes().then((res) => {
        recipes.value = res.data
      })
    }
  })
</script>

<template>
  <p v-if="props.isSearch">Результаты поиска по запросу</p>
  <h4>{{ props.title }}</h4>
  <div>
    <p>
      {{ props.isSearch ? 'Найдено рецептов' : 'Рецептов' }}: {{ totalRecipes }}
    </p>
    <div>
      Сортировать:
      <button>по рейтингу</button>
      <button>по кол-ву комментариев</button>
    </div>
  </div>
  <template v-for="recipe of data" :key="recipe.id">
    <RecipeCard :recipe="data" />
  </template>
</template>
