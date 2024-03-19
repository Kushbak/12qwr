<script setup>
  import { defineProps } from 'vue'

  const props = defineProps(['onClick', 'class', 'disabled', 'type'])
  const btnTypeClass = 'button_' + (props.type || 'default')
</script>

<template>
  <button
    @click="props.onClick"
    :class="[
      'button',
      btnTypeClass,
      props.class,
      props.disabled && 'button_disabled',
    ]"
  >
    <slot></slot>
    <span class="button__icon">
      <slot name="icon"></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
  .button {
    cursor: pointer;
    padding: 10px 24px;
    border-radius: 12px;
    color: var(--color-white);
    border: none;
    font-size: 16px;
    &_default {
      background-color: var(--color-main);
    }
    &_lucid {
      background-color: transparent;
      color: var(--color-dark);
    }
    &__icon {
      margin: 0px 4px;
    }

    /* change outline color on focus while navigating by tab */
    &:focus {
      outline: 2px solid #007bff;
      outline-offset: 1px;
    }
    &:focus:not(:focus-visible) {
      outline: none;
    }
    &:focus:focus-visible {
      outline-color: var(--color-main);
    }
  }
</style>
