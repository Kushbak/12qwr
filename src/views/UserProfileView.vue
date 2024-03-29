<script setup>
  import { onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import RecipeCard from '@/ui/RecipeCard/RecipeCard.vue'
  import AvatarComponent from '@/ui/Avatar/AvatarComponent.vue'
  import store from '@/store'
  import { USER_ACTIONS } from '@/store/actions'

  const route = useRoute()
  const userData = computed(() => store.state.user.userData)

  onMounted(() => {
    store.dispatch(USER_ACTIONS.GET_USER_BY_ID, route.params.id)
  })
</script>

<template>
  <div class="profile">
    <div class="profile__data">
      <AvatarComponent :avatar="userData?.avatar?.file" class="profile__avatar" />
      <h3 class="profile__username">{{ userData?.username }}</h3>
    </div>
  </div>
  <div class="profile__recipes">
    <h3>Добавленные рецепты</h3>
    <template v-if="userData?.recipes?.length">
      <RecipeCard v-for="recipe of userData?.recipes" :recipe="recipe" :key="recipe.id" />
    </template>
    <p v-else>Пока нет рецептов</p>
  </div>
</template>
