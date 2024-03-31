<script setup>
  import { defineProps, defineEmits, ref } from 'vue'
  import { loadImg } from '@/assets/img'
  import { ERROR_MESSAGES_LOCALE } from '@/utils/const'

  const props = defineProps(['placeholder', 'error', 'class'])
  const emit = defineEmits(['change'])

  const fileInput = ref(null)

  const handleChange = (e) => {
    const file = new FileReader()
    file.onload = (event) => {
      fileInput.value = event.target.result
    }
    file.readAsDataURL(e.target.files[0])
    emit('change', e.target.files[0])
  }

  const handleRemoveImage = () => {
    fileInput.value = null
    emit('change', null)
  }
</script>

<template>
  <div
    :class="['input__container', props.class]"
    :style="{ background: `url(${fileInput}) center center no-repeat / cover` }"
  >
    <template v-if="fileInput">
      <button class="input__removeImg" @click="handleRemoveImage">x</button>
      <img class="input__img" :src="fileInput" alt="file" />
    </template>
    <label v-else class="input__label" tabindex="0">
      <img :src="loadImg" />
      <p>{{ props.placeholder }}</p>
      <input @change="handleChange" type="file" class="input_hide" accept=".jpg, .jpeg, .png" />
    </label>
    <p class="error" v-if="props.error">{{ ERROR_MESSAGES_LOCALE[error] || error }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .input {
    &__container {
      background-color: var(--color-white-1);
      border-radius: 12px;
      height: 100%;
      gap: 8px;
      position: relative;
    }
    &__label {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
    }
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &__removeImg {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &_hide {
      display: none;
    }
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-to,
  .v-leave-from {
    opacity: 1;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }
</style>
