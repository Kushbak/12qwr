/**
 *
 * @param timeString - time in format 00:01:20
 * @returns string - in format "1 час 20 минут"
 */
export const formatTime = (timeString) => {
  const [days, hours, minutes] = timeString.split(':').map(Number)
  let formattedTime = ''

  if (days > 0) {
    formattedTime += `${days} час `
  }

  if (hours > 0 || days > 0) {
    formattedTime += `${hours} минут `
  }

  formattedTime += `${minutes} секунд`

  return formattedTime.trim()
}
