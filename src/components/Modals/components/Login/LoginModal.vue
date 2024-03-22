<script setup>
  import store from '@/store'
  import ButtonComponent from '@/ui/Button/ButtonComponent.vue'
  import InputComponent from '@/ui/Input/InputComponent.vue'
  import { MODAL_KEYS } from '@/utils/const'

  const openRegisterModal = () => {
    store.commit('openModal', { modalName: MODAL_KEYS.REGISTER })
  }
</script>

<template>
  <div class="login__container">
    <div class="login">
      <form class="login__form">
        <h3 class="login__title">Вход</h3>
        <InputComponent placeholder="Адрес электронной почты" />
        <InputComponent placeholder="Пароль" type="password" />
        <div class="login__forgotPassBlock">
          <ButtonComponent class="login__forgotPass" type="lucid">
            Забыли пароль?
          </ButtonComponent>
        </div>
        <ButtonComponent :disabled="true">Войти</ButtonComponent>
      </form>
      <ButtonComponent>Вход с аккаунтом гугл</ButtonComponent>
    </div>
    <div class="login__toRegister">
      <h3>Еще нет аккаунта?</h3>
      <ButtonComponent type="light" :onClick="openRegisterModal">
        Зарегистрироваться
      </ButtonComponent>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    padding: 100px 140px;
    &__title {
      color: var(--color-dark);
      font-size: 24px;
      margin-bottom: 34px;
      text-align: center;
    }
    &__container {
      display: flex;
    }
    &__form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }
    &__forgotPassBlock {
      display: flex;
      justify-content: flex-end;
      margin: 6px 0 14px;
    }
    &__forgotPass {
      color: var(--color-dark);
      font-size: 14px;
      padding: 2px 4px;
    }
    &__toRegister {
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-white);
      flex-direction: column;
      gap: 24px;
      padding: 0 60px;
      background: linear-gradient(165.9deg, #ffb72a -6.04%, #ff852c 103.45%);
    }
  }
</style>
