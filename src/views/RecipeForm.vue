<script setup>
  import { clock, image, video } from '@/assets/img'
  import ButtonComponent from '@/ui/Button/ButtonComponent.vue'
  import FileInputComponent from '@/ui/FileInput/FileInputComponent.vue'
  import InputComponent from '@/ui/Input/InputComponent.vue'
  import { reactive, ref } from 'vue'

  const formData = reactive({
    name: '',
    description: '',
    category: '',
    image: '',
    ingredients: [],
    cooking_description: '',
    cooking_url: '',
    cooking_time: '',
  })
  const ingredients = ref([{ name: '', amount: '' }])
  const fileInput = ref(null)

  const handleFileChange = (file) => {
    fileInput.value = file
  }

  const addIngredientFields = () => {
    ingredients.value.push({ name: '', amount: '' })
  }

  const onSubmit = () => {
    console.log({ formData, ingredients })
  }
</script>

<!-- todo
  add num validator for ingredients amount
  add ingredients to formData concatinating
  add img submitting to another endpoint to get img id to formData
  then submit formdata to post recipe
  fix fileinput height
  add preview for img fileinput
  add select to category
  add validator for time inputs
-->
<template>
  <form class="recipeForm" @submit.prevent="onSubmit">
    <div class="recipeForm__titleBlock">
      <p class="recipeForm__title">Ваш новый рецепт:</p>
      <input type="text" class="recipeForm__titleInput" placeholder="Название рецепта" v-model="formData.name" />
    </div>
    <div class="inputBlock">
      <p class="inputBlock__label">
        <img :src="clock" alt="clock" />
        Время приготовления:
      </p>
      <div class="inputBlock__time">
        <InputComponent placeholder="0" :noMargin="true" />
        часов
      </div>
      <div class="inputBlock__time">
        <InputComponent placeholder="0" :noMargin="true" />
        минут
      </div>
    </div>
    <div class="inputBlock inputBlock_col">
      <p class="inputBlock__label">
        <img :src="video" alt="video" />
        Видео с приготовлением блюда (необязательно):
      </p>
      <InputComponent v-model="formData.cooking_url" placeholder="Ссылка на видео" />
    </div>
    <div class="inputBlock inputBlock_col">
      <p class="inputBlock__label">
        <img :src="image" alt="image" />
        Фото готового блюда:
      </p>
      <FileInputComponent @change="handleFileChange" placeholder="Загрузить фото" class="inputBlock__maxHeight" />
    </div>
    <div class="inputBlock">
      <p class="inputBlock__label">Категория блюда:</p>
      <InputComponent v-model="formData.category" placeholder="Выберите категорию" :noMargin="true" />
    </div>
    <div class="inputBlock inputBlock_col">
      <p class="inputBlock__label">Описание:</p>
      <InputComponent v-model="formData.description" class="inputBlock__maxHeight" placeholder="Введите текст" />
    </div>
    <div class="inputBlock inputBlock_col">
      <p class="recipeForm__subtitle">Ингредиенты:</p>
      <div class="inputBlock" v-for="(ingredient, index) of ingredients" :key="index">
        {{ index + 1 }} ингредиент:
        <InputComponent v-model="ingredient.name" placeholder="Название" />
        <InputComponent v-model="ingredient.amount" placeholder="Количество" type="number" min="0" />
      </div>
      <ButtonComponent btnType="lucid" @click="addIngredientFields">+ Еще один ингредиент</ButtonComponent>
    </div>
    <div class="inputBlock inputBlock_col">
      <p class="recipeForm__subtitle">Приготовление:</p>
      <InputComponent
        v-model="formData.cooking_description"
        class="inputBlock__maxHeight"
        placeholder="Введите текст"
      />
    </div>
    <ButtonComponent class="recipeForm__submit" type="submit">Добавить рецепт</ButtonComponent>
  </form>
</template>

<style lang="scss" scoped>
  .recipeForm {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    gap: 32px;
    color: var(--color-dark);
    &__titleBlock {
      text-align: center;
    }
    &__titleInput {
      font-size: 32px;
      margin: 8px 12px;
      border: none;
      background: none;
      caret-color: var(--color-main);
      &::placeholder {
        text-align: center;
        color: var(--color-grey);
      }
      &:focus {
        outline: none;
      }
    }
    &__subtitle {
      font-size: 20px;
      margin-bottom: 12px;
    }
    &__submit {
      margin: 30px 0;
    }
  }
  .inputBlock {
    display: flex;
    gap: 12px;
    &_col {
      flex-direction: column;
    }
    &__label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 16px;
      font-weight: 500;
    }
    &__time {
      width: 110px;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-right: 12px;
    }
    &__maxHeight {
      height: 320px;
    }
  }
</style>
