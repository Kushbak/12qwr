import { formatCommentDate } from '../src/utils'
import { describe, expect, test } from 'vitest'

describe('formatCommentDate', () => {
  test('should format date correctly', () => {
    const dateString = '2024-03-29T10:30:00Z'
    const expectedFormattedDate = '29.03.2024 в 16:30'

    const formattedDate = formatCommentDate(dateString)

    expect(formattedDate).toBe(expectedFormattedDate)
  })

  test('should handle leading zeros correctly', () => {
    const dateString = '2024-01-05T09:05:00Z'
    const expectedFormattedDate = '05.01.2024 в 15:05'

    const formattedDate = formatCommentDate(dateString)

    expect(formattedDate).toBe(expectedFormattedDate)
  })
})
