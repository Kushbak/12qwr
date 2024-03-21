<script setup>
  import store from '@/store'
  import { computed } from 'vue'
  import LoginModal from './components/Login/LoginModal.vue'

  const modals = computed(() => store.state.modals)
  console.log({ modals })
</script>

<template>
  <template v-if="modals.currentModal === 'Login'">
    <LoginModal />
  </template>
</template>
