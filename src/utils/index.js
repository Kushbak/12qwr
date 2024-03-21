/**
 *
 * @param timeString - time in format 00:01:20
 * @returns string - in format "1 час 20 минут"
 */
export const formatTime = (timeString) => {
  const [days, hours, minutes] = timeString.split(':').map(Number)
  let formattedTime = ''

  if (days > 0) {
    formattedTime += `${days} дней`
  }

  if (hours > 0 || days > 0) {
    formattedTime += `${hours} час`
  }

  formattedTime += `${minutes} минут`

  return formattedTime.trim()
}

export const getInitialFilters = () => {
  return {
    category: null,
    ordering: null,
    search: null,
    page: 1,
    limit: 10,
  }
}

export const formatFilters = (filters) => {
  const newFilters = {}
  Object.keys(filters).forEach((key) => {
    if (key === 'category' && filters[key] !== 0) {
      newFilters[key] = filters[key]
      return
    }
    newFilters[key] = filters[key]
  })
}

export const debounce = (cb, ms) => {
  let timer

  return (...args) => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      cb(...args)
    }, ms)
  }
}
