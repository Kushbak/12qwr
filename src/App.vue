<script setup>
  import HeaderComponent from '@/components/Header/HeaderComponent'
  import AppLayout from '@/components/Layout/AppLayout.vue'
  import CategoriesComponent from '@/components/Categories/CategoriesComponent.vue'
</script>

<template>
  <AppLayout>
    <HeaderComponent />
    <CategoriesComponent />
    <router-view />
  </AppLayout>
</template>

<style lang="scss"></style>
