<script setup>
  import store from '@/store'
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import InputComponent from '@/ui/Input/InputComponent'
  import { MODAL_KEYS } from '@/utils/const'

  const openLoginModal = () => {
    store.commit('openModal', {
      modalName: MODAL_KEYS.LOGIN,
      props: { whiteClose: true },
    })
  }
</script>

<template>
  <div class="register__container">
    <div class="register__toLogin">
      <h3>Уже есть аккаунт?</h3>
      <ButtonComponent type="light" :onClick="openLoginModal">
        Войти
      </ButtonComponent>
    </div>
    <div class="register">
      <div class="register__form">
        <h3 class="register__title">Регистрация</h3>
        <InputComponent placeholder="Адрес электронной почты" type="email" />
        <InputComponent placeholder="Имя пользователя" />
        <InputComponent placeholder="Пароль" type="password" />
        <p class="register__passwordValidate">
          Минимум 8 символов, включая цифры и спецсимволы (!, “, #, $ и т.д.)
        </p>
        <InputComponent placeholder="Подтвердите пароль" type="password" />
        <ButtonComponent class="register__submit" :disabled="true">
          Зарегистрироваться
        </ButtonComponent>
      </div>
      <ButtonComponent>Регистрация с аккаунтом Google</ButtonComponent>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  // todo fix style dublicating from login modal
  .register {
    padding: 60px 100px;
    &__container {
      display: flex;
    }
    &__title {
      color: var(--color-dark);
      font-size: 24px;
      margin-bottom: 34px;
      text-align: center;
    }
    &__form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
      max-width: 350px;
    }
    &__submit {
      margin-top: 12px;
    }
    &__passwordValidate {
      color: var(--color-grey);
      font-size: 14px;
    }
    &__toLogin {
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
