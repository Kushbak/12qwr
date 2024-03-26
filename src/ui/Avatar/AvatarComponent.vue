<script setup>
  import { defineProps } from 'vue'
  import { emptyAvatar } from '@/assets/img'

  const props = defineProps(['avatar', 'class'])
  console.log({ props })
</script>

<template>
  <img :src="props.avatar || emptyAvatar" alt="avatar" :class="['avatar', props.class]" />
</template>

<style lang="scss" scoped>
  .avatar {
    width: 100%;
    max-width: 32px;
    max-height: 32px;
  }
</style>
