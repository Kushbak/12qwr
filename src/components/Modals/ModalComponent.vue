<script setup>
  import store from '@/store'
  import { computed } from 'vue'
  import LoginModal from './components/Login/LoginModal.vue'
  import RegisterModal from './components/Register/RegisterModal.vue'
  import { MODAL_KEYS, MODALS_WITH_WHTIE_CLOSE } from '@/utils/const'
  import ModalContainer from './ModalContainer.vue'

  const modals = computed(() => store.state.modals)

  const withWhiteClose = computed(() => {
    return MODALS_WITH_WHTIE_CLOSE.includes(modals.value.currentModal)
  })
</script>

<template>
  <transition>
    <ModalContainer v-if="modals.currentModal !== null" :whiteClose="withWhiteClose">
      <LoginModal v-if="modals.currentModal === MODAL_KEYS.LOGIN" v-bind="modals.props" />
      <RegisterModal v-if="modals.currentModal === MODAL_KEYS.REGISTER" v-bind="modals.props" />
    </ModalContainer>
  </transition>
</template>

<style lang="scss" scoped>
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-to,
  .v-leave-from {
    opacity: 1;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }
</style>
