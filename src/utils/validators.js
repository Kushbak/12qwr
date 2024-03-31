import { required, numeric, helpers, maxLength, minLength, url } from '@vuelidate/validators'
import { ERROR_MESSAGES } from './const'

export const recipeCreateValidation = {
  name: {
    required: helpers.withMessage(ERROR_MESSAGES.required, required),
    minLength: minLength(1),
    maxLength: maxLength(255),
  },
  description: {},
  category: {
    required: helpers.withMessage(ERROR_MESSAGES.required, required),
  },
  image: {},
  ingredients: {
    $each: helpers.forEach({
      name: {
        required: helpers.withMessage(ERROR_MESSAGES.required, required),
      },
      amount: {
        required: helpers.withMessage(ERROR_MESSAGES.required, required),
        numeric,
      },
    }),
  },
  cooking_description: {},
  cooking_url: {
    maxLength: maxLength(200),
    url: helpers.withMessage(ERROR_MESSAGES.invalidUrl, url),
  },
  cooking_time: {},
}
