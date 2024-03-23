<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import { CATEGORIES } from '@/utils/const'
  import { arrowBottom, arrowTop } from '@/assets/img'

  const activeCategory = computed(() => store.state.recipes.filters.category)
  const categories = ref([])
  const hiddenCategories = ref([])
  const isMoreCategoriesShown = ref(false)

  const onMoreCategoriesClick = () => {
    isMoreCategoriesShown.value = !isMoreCategoriesShown.value
    console.log(0, isMoreCategoriesShown.value)
  }

  const hideMoreCategories = () => {
    if (isMoreCategoriesShown.value) {
      // isMoreCategoriesShown.value = false
    }
    console.log(1, isMoreCategoriesShown.value)
  }

  const onCategoryClick = (category) => {
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
    for (let i = 0; i < CATEGORIES.length; i++) {
      if (i < Math.floor(window.document.body.clientWidth / ELEMENT_WIDTH)) {
        categories.value.push(CATEGORIES[i])
      } else {
        hiddenCategories.value.push(CATEGORIES[i])
      }
    }
  }

  onMounted(() => {
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
      :class="[
        'categories__item',
        CATEGORIES[activeCategory] === category && 'categories__item_active',
      ]"
      :onClick="() => onCategoryClick(index)"
    >
      {{ category }}
    </ButtonComponent>
    <ButtonComponent
      class="categories__item"
      type="lucid"
      :onClick="onMoreCategoriesClick"
      v-if="hiddenCategories.length"
    >
      Еще
      <template #icon>
        <img :src="isMoreCategoriesShown ? arrowTop : arrowBottom" />
      </template>
    </ButtonComponent>
    <div
      class="categories__dropdown"
      v-click-outside="hideMoreCategories"
      v-if="isMoreCategoriesShown"
    >
      <ButtonComponent
        type="lucid"
        v-for="(category, index) of hiddenCategories"
        :key="category"
        class="categories__dropdownItem"
        :onClick="() => onCategoryClick(categories.length + index)"
      >
        {{ category }}
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
