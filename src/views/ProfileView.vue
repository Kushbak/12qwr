<script setup>
  import { computed, onMounted, ref } from 'vue'
  import store from '@/store'
  import { edit } from '@/assets/img'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import AvatarComponent from '@/ui/Avatar/AvatarComponent.vue'
  import RecipeCard from '@/ui/RecipeCard/RecipeCard.vue'
  // todo split tabs to component
  const currentTab = ref(0)
  const userData = computed(() => store.state.user.userData)
  const data = computed(
    () =>
      ({
        0: store.state.recipes.myRecipes,
        1: store.state.recipes.myBookmarks,
      }[currentTab.value]),
  )

  const onTabClick = (tab) => {
    currentTab.value = tab
    if (data.value.length) return
    if (tab === 0) {
      store.dispatch(RECIPES_ACTIONS.GET_MY_RECIPES)
      return
    }
    if (tab === 1) {
      store.dispatch(RECIPES_ACTIONS.GET_MY_BOOKMARKS)
      return
    }
  }

  onMounted(() => {
    if (!store.state.recipes.myRecipes.length) {
      store.dispatch(RECIPES_ACTIONS.GET_MY_RECIPES)
    }
  })
  console.log({ onTabClick })
</script>

<template>
  <div class="profile">
    <div class="profile__data">
      <AvatarComponent :avatar="userData.avatar?.file" class="profile__avatar" />
      <div class="profile__info">
        <h3 class="profile__username">{{ userData.username }}</h3>
        <button class="profile__editBtn"><img :src="edit" alt="edit" />Редактировать профиль</button>
      </div>
    </div>
    <div class="profile__recipesContainer">
      <div class="tabs">
        <button @click="() => onTabClick(0)" :class="['tabs__btn', currentTab === 0 && 'tabs__btn_active']">
          Мои рецепты
        </button>
        <button @click="() => onTabClick(1)" :class="['tabs__btn', currentTab === 1 && 'tabs__btn_active']">
          Сохраненные рецепты
        </button>
      </div>
      <div class="profile__recipes">
        <template v-if="data?.length">
          <RecipeCard v-for="recipe of data" :recipe="recipe" :key="recipe.id" />
        </template>
        <p v-else>Пока нет рецептов</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile {
    &__data {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
    }
    &__avatar {
      max-width: none;
      max-height: none;
      width: auto;
    }
    &__username {
      font-size: 32px;
      color: var(--color-dark);
      margin-bottom: 4px;
    }
    &__editBtn {
      cursor: pointer;
      color: var(--color-main);
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
    }
    &__recipes {
      padding-top: 20px;
    }
  }

  .tabs {
    display: flex;
    gap: 28px;
    &__btn {
      color: var(--color-dark);
      font-size: 24px;
      font-weight: bold;
      padding: 4px 0;
      border: none;
      background: none;
      opacity: 0.7;
      cursor: pointer;
      &_active {
        opacity: 1;
        border-bottom: 2px solid var(--color-black);
      }
    }
  }
</style>
