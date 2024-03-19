<script setup>
  import { defineProps } from 'vue'

  const props = defineProps(['onClick', 'className', 'disabled', 'type'])
  const btnTypeClass = 'button_' + (props.type || 'default')
</script>

<template>
  <button
    @click="props.onClick"
    :class="[
      'button',
      btnTypeClass,
      className,
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
    padding: 8px 24px;
    border-radius: 12px;
    color: #fff;
    border: none;
    font-size: 16px;
    &_default {
      background-color: var(--color-main);
    }
    &__icon {
      margin: 0px 4px;
    }
  }
</style>
