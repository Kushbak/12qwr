<script setup>
  import { computed } from 'vue'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent.vue'
  import InputComponent from '@/ui/Input/InputComponent.vue'
  import { debounce } from '@/utils'
  import { arrowBottom } from '@/assets/img'

  const user = computed(() => store.state.user)

  const onChange = debounce((e) => {
    store.dispatch(RECIPES_ACTIONS.SEARCH_RECIPES, e.target.value)
  }, 700)

  const handleOpenLoginModal = () => {
    store.commit('openModal', {
      modalName: 'Login',
    })
  }

  const handleProfileClick = () => {
    console.log('profile clicked')
  }
</script>

<template>
  <header class="header">
    <h2 class="header__logo">Мои рецепты</h2>
    <InputComponent
      class="header__search"
      placeholder="Поиск"
      @input="onChange"
    />
    <div class="header__btns">
      <ButtonComponent>Добавить рецепт</ButtonComponent>
      <ButtonComponent
        v-if="user.userData"
        type="lucid"
        :onClick="handleProfileClick"
      >
        Профиль
        <template #icon>
          <img :src="arrowBottom" />
        </template>
      </ButtonComponent>
      <ButtonComponent v-else type="lucid" :onClick="handleOpenLoginModal">
        Вход/Регистрация
        <template #icon>
          <img :src="arrowBottom" />
        </template>
      </ButtonComponent>
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
  }
</style>
