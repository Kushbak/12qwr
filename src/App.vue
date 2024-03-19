<script setup>
  import HeaderComponent from '@/components/Header/HeaderComponent'
  import AppLayout from '@/components/Layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <HeaderComponent />
    <router-view />
  </AppLayout>
</template>

<style lang="scss"></style>
