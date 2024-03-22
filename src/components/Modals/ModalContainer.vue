<script setup>
  import { xMark, xMarkWhite } from '@/assets/img'
  import store from '@/store'

  const onOutsideClick = () => {
    store.commit('closeModal')
  }
</script>

<template>
  <div class="modalContainer__backdrop">
    <div class="modalContainer">
      <slot></slot>
      <button class="modalContainer__close" @click="onOutsideClick">
        <img
          v-if="store.state.modals.props.whiteClose"
          :src="xMarkWhite"
          alt="x"
        />
        <img v-else :src="xMark" alt="x" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modalContainer {
    border-radius: 24px;
    background-color: var(--color-white);
    position: relative;
    // to child elements inherit border-radius
    overflow: hidden;
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
    &__close {
      cursor: pointer;
      border: none;
      background: none;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
</style>
