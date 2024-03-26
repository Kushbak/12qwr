import { HOUR_ON_SECONDS } from './const'

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

export const formatCommentDate = (dateString) => {
  const date = new Date(dateString)

  // Get day, month, year, hours, and minutes
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // Format the date
  const formattedDate = `${day}.${month}.${year} в ${hours}:${minutes}`

  return formattedDate
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

export const setCookie = (name, value, seconds = HOUR_ON_SECONDS) => {
  let expires = ''
  var date = new Date()
  date.setTime(date.getTime() + seconds * 1000)
  expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export const getCookie = (name) => {
  try {
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  } catch (e) {
    return null
  }
}

export const removeCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;'
}

const b64DecodeUnicode = (str) => {
  return decodeURIComponent(
    atob(str).replace(/(.)/g, (m, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase()
      if (code.length < 2) {
        code = '0' + code
      }
      return '%' + code
    }),
  )
}

const base64UrlDecode = (str) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/')
  switch (output.length % 4) {
    case 0:
      break
    case 2:
      output += '=='
      break
    case 3:
      output += '='
      break
    default:
      throw new Error('base64 string is not of the correct length')
  }

  return b64DecodeUnicode(output)
}

export const jwtDecode = (token, options) => {
  if (typeof token !== 'string') {
    throw new Error('Invalid token specified: must be a string')
  }

  options ||= {}

  const pos = options.header === true ? 0 : 1
  const part = token.split('.')[pos]

  if (typeof part !== 'string') {
    throw new Error(`Invalid token specified: missing part #${pos + 1}`)
  }

  const decoded = base64UrlDecode(part)

  return JSON.parse(decoded)
}

export const getTokenExpirationInSeconds = (token) => {
  const decoded = jwtDecode(token)
  return decoded.exp - decoded.iat
}
