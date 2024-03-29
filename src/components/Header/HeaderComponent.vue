<script setup>
  import { computed, ref } from 'vue'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent.vue'
  import InputComponent from '@/ui/Input/InputComponent.vue'
  import { debounce } from '@/utils'
  import { arrowBottom, arrowTop } from '@/assets/img'
  import router from '@/router'
  import { withAuth } from '@/utils/hofs'

  const user = computed(() => store.state.user)
  const isProfileDropdownOpen = ref(false)

  const onChange = debounce((e) => {
    store.dispatch(RECIPES_ACTIONS.SEARCH_RECIPES, e.target.value)
  }, 700)

  const handleOpenLoginModal = () => {
    store.commit('openModal', {
      modalName: 'Login',
    })
  }

  const handleProfileClick = () => {
    isProfileDropdownOpen.value = !isProfileDropdownOpen.value
  }

  const navigateToProfile = () => {
    router.push('/profile/')
  }

  const navigateToRecipeForm = withAuth(() => router.push('/recipeForm'))

  const logout = () => {
    store.commit('logout')
  }
</script>

<template>
  <header class="header">
    <router-link to="/">
      <h2 class="header__logo">Мои рецепты</h2>
    </router-link>
    <InputComponent class="header__search" placeholder="Поиск" @input="onChange" />
    <div class="header__btns">
      <ButtonComponent @click="navigateToRecipeForm">Добавить рецепт</ButtonComponent>
      <ButtonComponent v-if="user.profile" btnType="lucid" @click="handleProfileClick">
        Профиль
        <template #icon>
          <img :src="isProfileDropdownOpen ? arrowTop : arrowBottom" />
        </template>
      </ButtonComponent>
      <ButtonComponent v-else btnType="lucid" @click="handleOpenLoginModal">
        Вход/Регистрация
        <template #icon>
          <img :src="arrowBottom" />
        </template>
      </ButtonComponent>
      <!-- todo split dropdowns to component -->
      <div class="header__dropdown" v-if="isProfileDropdownOpen && user.profile">
        <ButtonComponent btnType="lucid" @click="navigateToProfile"> Перейти в профиль </ButtonComponent>
        <ButtonComponent btnType="lucid" class="header__logout" @click="logout"> Выйти </ButtonComponent>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 26px 0;
    &__logo {
      font-size: 22px;
      color: var(--color-main);
      margin-right: 27px;
    }
    &__search {
      max-width: 360px;
      width: 100%;
      margin-bottom: 0;
    }
    &__btns {
      display: flex;
      gap: 24px;
    }
    &__dropdown {
      display: flex;
      flex-direction: column;
      position: absolute;
      background-color: var(--color-white);
      box-shadow: 0px 5px 12px 0px #28262214;
      border-radius: 12px;
    }
    &__logout {
      color: var(--color-error);
    }
  }
</style>
