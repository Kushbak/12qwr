<script setup>
  import store from '@/store'
  import { check } from '@/assets/img'
  import { computed } from 'vue'

  const text = computed(() => store.state.modals.toaster)
</script>

<template>
  <transition>
    <div class="toaster" v-if="text">
      <img :src="check" alt="check" class="toaster__icon" />
      <p class="toaster__text">{{ text }}</p>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .toaster {
    background-color: var(--color-success);
    display: flex;
    align-items: center;
    width: 340px;
    padding: 16px;
    position: absolute;
    top: 20px;
    right: 200px;
    gap: 12px;
    border-radius: 18px;
    &__text {
      color: var(--color-white);
    }
  }

  .v-enter-from,
  .v-leave-to {
    top: -100px;
  }
  .v-enter-to,
  .v-leave-from {
    top: 20px;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s linear;
  }
</style>
