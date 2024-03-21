<script setup>
  import store from '@/store'

  const onOutsideClick = () => {
    store.commit('closeModal')
  }
</script>

<template>
  <div class="modalContainer__backdrop">
    <div class="modalContainer" v-click-outside="onOutsideClick">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modalContainer {
    border-radius: 24px;
    background-color: var(--color-white);
    &__backdrop {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #00000040;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
