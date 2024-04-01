export const ORDER_BY = {
  AVG_RATING_ASC: 'avg_rating',
  AVG_RATING_DESC: '-avg_rating',
  COMMENTS_COUNT_ASC: 'comments_count',
  COMMENTS_COUNT_DESC: '-comments_count',
}

export const ALL_CATEGORY = {
  id: 0,
  name: 'Все рецепты',
}

export const MODAL_KEYS = {
  LOGIN: 'Login',
  REGISTER: 'Register',
}

export const MODALS_WITH_WHTIE_CLOSE = [MODAL_KEYS.LOGIN]

export const ERROR_MESSAGES = {
  required: 'This field is required.',
  usernameExists: 'User with this username already exists.',
  emailExists: 'User with this Email already exists.',
  min8symbolsPassword: 'This password is too short. It must contain at least 8 characters.',
  incorrectLoginCredentials: 'No active account found with the given credentials',
  invalidUrl: 'Enter a valid URL.',
  cookingDurationWrongFormat:
    'Duration has wrong format. Use one of these formats instead: [DD] [HH:[MM:]]ss[.uuuuuu].',
  invalidNumber: 'Value must be numeric',
}

export const ERROR_MESSAGES_LOCALE = {
  [ERROR_MESSAGES.required]: 'Это поле обязательно',
  [ERROR_MESSAGES.incorrectLoginCredentials]: 'Неправильная почта или пароль',
  [ERROR_MESSAGES.emailExists]: 'Такая почта уже зарегистрирована',
  [ERROR_MESSAGES.usernameExists]: 'Такое имя пользователя уже зарегистрировано',
  [ERROR_MESSAGES.min8symbolsPassword]: 'Пароль должен состоять минимум из 8 символов',
  [ERROR_MESSAGES.invalidUrl]: 'Введите валидную ссылку',
  [ERROR_MESSAGES.cookingDurationWrongFormat]: 'Введите валидное время',
  [ERROR_MESSAGES.invalidNumber]: 'Введите валидное число',
}

export const TOASTER_MESSAGES = {
  recipeBookmarked: 'Рецепт сохранен в профиле',
  recipeDeleted: 'Рецепт успешно удален',
  recipeChanged: 'Изменения успешно внесены',
  passwordChanged: 'Пароль успешно изменен',
}

export const HOUR_ON_SECONDS = 3600

export const CONJUGATIONS = {
  days: ['день', 'дня', 'дней'],
  hours: ['час', 'часа', 'часов'],
  minutes: ['минута', 'минуты', 'минут'],
  seconds: ['секунда', 'секунды', 'секунд'],
}
