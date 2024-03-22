<script setup>
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent.vue'
  import InputComponent from '@/ui/Input/InputComponent.vue'
  import { debounce } from '@/utils'

  const onChange = debounce((e) => {
    store.dispatch(RECIPES_ACTIONS.SEARCH_RECIPES, e.target.value)
  }, 700)

  const handleOpenLoginModal = () => {
    store.commit('openModal', {
      modalName: 'Login',
      props: { whiteClose: true },
    })
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
      <ButtonComponent type="lucid" :onClick="handleOpenLoginModal">
        Вход/Регистрация
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
    }
    &__btns {
      display: flex;
      gap: 24px;
    }
  }
</style>
