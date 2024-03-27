<script setup>
  import { onMounted, computed } from 'vue'
  import RecipeCard from '@/ui/RecipeCard/RecipeCard.vue'
  import AvatarComponent from '@/ui/Avatar/AvatarComponent.vue'
  import { useRoute } from 'vue-router'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/utils/const'

  const route = useRoute()
  const recipes = computed(() => store.state.recipes.userRecipes)

  onMounted(() => {
    store.dispatch(RECIPES_ACTIONS.GET_USER_RECIPES_BY_USER_ID, route.params.id)
  })
</script>

<template>
  <div class="profile">
    <div class="profile__data">
      <AvatarComponent :avatar="userData.avatar?.file" class="profile__avatar" />
      <h3 class="profile__username">{{ userData.username }}</h3>
    </div>
  </div>
  <div class="profile__recipes">
    <h3>Добавленные рецепты</h3>
    <template v-if="recipes?.length">
      <RecipeCard v-for="recipe of recipes" :recipe="recipe" :key="recipe.id" />
    </template>
    <p v-else>Пока нет рецептов</p>
  </div>
</template>
