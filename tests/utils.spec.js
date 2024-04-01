import { formatCommentDate } from '../src/utils'
import { describe, expect, test } from 'vitest'

describe('formatCommentDate', () => {
  test('should format date correctly with a specific time zone', () => {
    const dateString = '2024-03-29T10:30:00Z' // Время в UTC
    const expectedFormattedDate = '29.03.2024 в 16:30' // Ожидаемый вывод в часовом поясе GMT+5 (Например, Московское время)

    const originalTimeZone = process.env.TZ

    process.env.TZ = 'Europe/Moscow'

    const formattedDate = formatCommentDate(dateString)

    expect(formattedDate).toBe(expectedFormattedDate)

    process.env.TZ = originalTimeZone
  })
})
