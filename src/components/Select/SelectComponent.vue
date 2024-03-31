<script setup>
  import { defineProps, defineEmits, ref } from 'vue'
  import { arrowBottom, arrowTop } from '@/assets/img'

  const props = defineProps(['placeholder', 'data'])
  const emit = defineEmits(['change'])

  const selectedValue = ref(null)
  const isSelectOpen = ref(false)

  const handleSelect = (item) => {
    selectedValue.value = item
    emit('change', item)
    isSelectOpen.value = false
  }

  const toggleSelect = () => {
    isSelectOpen.value = !isSelectOpen.value
    console.log(props)
  }
</script>

<template>
  <div class="select">
    <div class="select__trigger">
      <label class="select__label" @click="toggleSelect">
        {{ selectedValue?.label || props.placeholder }}
        <img :src="isSelectOpen ? arrowTop : arrowBottom" alt="arrow" />
      </label>
    </div>
    <div class="select__list" v-if="isSelectOpen">
      <button class="select__item" v-for="item of props.data" :key="item.value" @click="() => handleSelect(item)">
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .select {
    width: 100%;
    height: 100%;
    position: relative;
    &__label {
      padding: 8px 16px;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      background-color: var(--color-white-1);
      color: var(--color-grey);
      border-radius: 12px;
      cursor: pointer;
    }
    &__list {
      display: flex;
      flex-direction: column;
      height: 300px;
      overflow-y: auto;
      scrollbar-color: var(--color-dark) var(--color-white-2);
      scrollbar-width: thin;
      width: 100%;
      position: absolute;
      top: calc(100% + 10px);
      border: 1px solid var(--color-white-1);
      background-color: #fbfbfb;
      box-shadow: 0px 5px 12px 0px #28262214;
      border-radius: 12px;
    }
    &__item {
      color: var(--color-dark);
      padding: 8px 16px;
      background: none;
      border: none;
      cursor: pointer;
      &:hover {
        background-color: var(--color-white-1);
      }
    }
  }
</style>
