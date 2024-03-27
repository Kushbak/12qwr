<script setup>
  import { computed, onUnmounted, reactive } from 'vue'
  import store from '@/store'
  import ButtonComponent from '@/ui/Button/ButtonComponent.vue'
  import InputComponent from '@/ui/Input/InputComponent.vue'
  import { ERROR_MESSAGES, MODAL_KEYS } from '@/utils/const'
  import { USER_ACTIONS } from '@/store/actions'

  const user = computed(() => store.state.user)
  const formData = reactive({
    email: '',
    password: '',
  })
  const openRegisterModal = () => {
    store.commit('openModal', { modalName: MODAL_KEYS.REGISTER })
  }

  const onSubmit = async () => {
    try {
      await store.dispatch(USER_ACTIONS.LOGIN, formData)
      store.commit('closeModal')
    } catch (e) {
      // todo refactor error cathing
      console.log(e)
    }
  }

  onUnmounted(() => {
    store.commit('setErrors', {})
  })
</script>

<template>
  <div class="login__container">
    <div class="login">
      <form class="login__form" @submit.prevent="onSubmit">
        <h3 class="login__title">Вход</h3>
        <InputComponent v-model="formData.email" placeholder="Адрес электронной почты" />
        <InputComponent v-model="formData.password" placeholder="Пароль" type="password" />
        <p class="error" v-if="user.errors">
          {{ ERROR_MESSAGES[user.errors.detail] }}
        </p>
        <div class="login__forgotPassBlock">
          <ButtonComponent class="login__forgotPass" type="lucid"> Забыли пароль? </ButtonComponent>
        </div>
        <ButtonComponent :disabled="user.isLoading">
          {{ user.isLoading ? 'Вход...' : 'Войти' }}
        </ButtonComponent>
      </form>
      <ButtonComponent>Вход с аккаунтом гугл</ButtonComponent>
    </div>
    <div class="login__toRegister">
      <h3>Еще нет аккаунта?</h3>
      <ButtonComponent type="light" @click="openRegisterModal"> Зарегистрироваться </ButtonComponent>
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
