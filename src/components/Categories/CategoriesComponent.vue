<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import { arrowBottom, arrowTop } from '@/assets/img'
  import router from '@/router'

  const activeCategory = computed(() => store.state.recipes.filters.category)
  const allCategories = computed(() => store.state.categories)
  const categories = ref([])
  const hiddenCategories = ref([])
  const isMoreCategoriesShown = ref(false)

  const onMoreCategoriesClick = () => {
    isMoreCategoriesShown.value = !isMoreCategoriesShown.value
  }

  const hideMoreCategories = () => {
    if (isMoreCategoriesShown.value) {
      // isMoreCategoriesShown.value = false
    }
  }

  const onCategoryClick = (category) => {
    if (router.currentRoute !== '/') router.push('/')
    if (category === activeCategory.value) return
    if (category === 0) {
      store.dispatch(RECIPES_ACTIONS.GET_RECIPES_BY_CATEGORY, 0)
      return
    }
    store.dispatch(RECIPES_ACTIONS.GET_RECIPES_BY_CATEGORY, category)
  }

  const sliceCategories = () => {
    const ELEMENT_WIDTH = 150
    categories.value = []
    hiddenCategories.value = []
    // todo refactor it to call loop after checking should i call it
    for (let i = 0; i < allCategories.value.length; i++) {
      if (i < Math.floor(window.document.body.clientWidth / ELEMENT_WIDTH)) {
        categories.value.push(allCategories.value[i])
      } else {
        hiddenCategories.value.push(allCategories.value[i])
      }
    }
  }

  onMounted(async () => {
    if (!store.state.categories.length) {
      await store.dispatch(RECIPES_ACTIONS.GET_ALL_CATEGORIES)
    }
    sliceCategories()
    window.addEventListener('resize', sliceCategories)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', sliceCategories)
  })
</script>

<template>
  <div class="categories">
    <ButtonComponent
      type="lucid"
      v-for="(category, index) of categories"
      :key="category"
      :class="['categories__item', allCategories[activeCategory] === category && 'categories__item_active']"
      @click="() => onCategoryClick(index)"
    >
      {{ category?.name }}
    </ButtonComponent>
    <ButtonComponent
      class="categories__item"
      type="lucid"
      @click="onMoreCategoriesClick"
      v-if="hiddenCategories.length"
    >
      Еще
      <template #icon>
        <img :src="isMoreCategoriesShown ? arrowTop : arrowBottom" />
      </template>
    </ButtonComponent>
    <div class="categories__dropdown" v-click-outside="hideMoreCategories" v-if="isMoreCategoriesShown">
      <ButtonComponent
        type="lucid"
        v-for="(category, index) of hiddenCategories"
        :key="category"
        class="categories__dropdownItem"
        @click="() => onCategoryClick(categories.length + index)"
      >
        {{ category?.name }}
      </ButtonComponent>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .categories {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    margin-bottom: 32px;
    position: relative;
    &__item {
      font-size: 14px;
      padding: 4px;
      &_active {
        font-weight: bold;
      }
    }
    &__dropdown {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 40px;
      right: 0;
      background-color: var(--color-white);
      box-shadow: 0px 5px 12px 0px #28262214;
      border-radius: 12px;
    }
  }
</style>
