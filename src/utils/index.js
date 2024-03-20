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
    limit: 5,
  }
}

export const formatFilters = (filters) => {
  Object.keys(filters)
}
