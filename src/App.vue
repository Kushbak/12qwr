<script setup>
  import HeaderComponent from '@/components/Header/HeaderComponent'
  import AppLayout from '@/components/Layout/AppLayout.vue'
  import CategoriesComponent from '@/components/Categories/CategoriesComponent.vue'
  import ModalComponent from '@/components/Modals/ModalComponent.vue'
  import ToasterComponent from '@/components/Toaster/ToasterComponent.vue'
  import store from './store'
  import { USER_ACTIONS } from './store/actions'
  import { onMounted, ref } from 'vue'

  const isLoading = ref(true)

  onMounted(async () => {
    isLoading.value = true
    await store.dispatch(USER_ACTIONS.INIT_APP)
    isLoading.value = false
  })
</script>

<template>
  <AppLayout v-if="!isLoading">
    <HeaderComponent />
    <CategoriesComponent />
    <router-view />
    <ModalComponent />
    <ToasterComponent />
  </AppLayout>
</template>

<style lang="scss"></style>
