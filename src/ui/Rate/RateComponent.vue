<script setup>
  import { defineProps, ref } from 'vue'
  import { star, starEmpty } from '@/assets/img'

  const props = defineProps({
    currentRate: { default: 0 },
    length: { default: 5 },
    handleRate: {},
  })

  const hoveredStar = ref(props.currentRate)

  const onMouseLeave = () => {
    hoveredStar.value = props.currentRate
  }

  const onMouseEnter = (e) => {
    hoveredStar.value = +e.target.dataset.id
  }

  const onRateClick = (e) => {
    const rate = +e.target.dataset.id
    if (rate !== props.currentRate) {
      props.handleRate()
    }
  }
</script>

<template>
  <div class="rating" @mouseleave="onMouseLeave">
    <img
      v-for="num of props.length"
      :key="num"
      :src="hoveredStar >= num ? star : starEmpty"
      :data-id="num"
      alt="star"
      class="rating__img"
      @click="onRateClick"
      @mouseenter="onMouseEnter"
    />
  </div>
</template>

<style lang="scss" scoped>
  .rating {
    display: flex;
    align-items: center;
    &__img {
      width: 20px;
      height: 20px;
    }
  }
</style>
