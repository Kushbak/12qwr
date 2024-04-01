import { getInitialFilters } from '../src/utils'
import { describe, expect, test } from 'vitest'

describe('getInitialFilters', () => {
  test('should return initial filters object', () => {
    const initialFilters = getInitialFilters()

    expect(initialFilters).toEqual({
      category: null,
      ordering: null,
      search: null,
      page: 1,
      limit: 10,
    })
  })

  test('should return default page and limit values if not provided', () => {
    const initialFilters = getInitialFilters()

    expect(initialFilters.page).toBe(1)
    expect(initialFilters.limit).toBe(10)
  })
})
