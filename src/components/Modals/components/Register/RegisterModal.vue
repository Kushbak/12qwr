<script setup>
  import store from '@/store'
  import { USER_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import InputComponent from '@/ui/Input/InputComponent'
  import { MODAL_KEYS } from '@/utils/const'
  import { computed, onUnmounted, reactive } from 'vue'

  const formData = reactive({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  })

  const user = computed(() => store.state.user)

  const openLoginModal = () => {
    store.commit('openModal', {
      modalName: MODAL_KEYS.LOGIN,
    })
  }

  const onSubmit = async () => {
    try {
      await store.dispatch(USER_ACTIONS.REGISTER, formData)
      store.commit('closeModal')
    } catch (e) {
      console.log(e)
    }
  }

  onUnmounted(() => {
    store.commit('setErrors', {})
  })
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
      <form class="register__form" @submit.prevent="onSubmit">
        <h3 class="register__title">Регистрация</h3>
        <InputComponent
          v-model="formData.email"
          placeholder="Адрес электронной почты"
          type="email"
          :error="user.errors.email?.[0]"
        />
        <InputComponent
          v-model="formData.username"
          placeholder="Имя пользователя"
          :error="user.errors.username?.[0]"
        />
        <InputComponent
          v-model="formData.password"
          placeholder="Пароль"
          type="password"
          :error="user.errors.password?.[0]"
        />
        <p class="register__passwordValidate">
          Минимум 8 символов, включая цифры и спецсимволы (!, “, #, $ и т.д.)
        </p>
        <InputComponent
          v-model="formData.confirm_password"
          placeholder="Подтвердите пароль"
          type="password"
          :error="user.errors.confirm_password?.[0]"
        />
        <ButtonComponent class="register__submit" :disabled="user.isLoading">
          {{ user.isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </ButtonComponent>
      </form>
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
      margin-bottom: 32px;
      max-width: 350px;
    }
    &__submit {
      margin-top: 12px;
    }
    &__passwordValidate {
      color: var(--color-grey);
      font-size: 14px;
      margin-bottom: 12px;
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
