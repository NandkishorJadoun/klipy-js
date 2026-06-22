import type { Mock } from 'vitest'
import type { KlipyItem, KlipyPage, KlipyResponse } from '../src/types'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { KlipyClient } from '../src/index'

function mockJsonResponse<T>(body: KlipyResponse<T>, ok = true, status = 200) {
  return {
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    json: async () => body,
  }
}

describe('class KlipyClient', () => {
  it('throws if no apiKey is provided', () => {
    // @ts-expect-error - intentionally testing invalid input
    expect(() => new KlipyClient({})).toThrow('KlipyClient requires an apiKey')
  })
})

describe('gifs search method', () => {
  let mockFetch: Mock

  const fakePage: KlipyPage<KlipyItem> = {
    data: [],
    current_page: 1,
    has_next: false,
    per_page: 0,
    meta: {
      item_min_width: 80,
      ad_max_resize_percent: 10,
    },
  }

  beforeEach(() => {
    mockFetch = vi.fn()
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('builds the search URL with correctly mapped query params', async () => {
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse<KlipyPage<KlipyItem>>({ result: true, data: fakePage }),
    )

    const client = new KlipyClient({ apiKey: 'abc123' })

    await client.gifs.search({
      q: 'dancing',
      customerId: 'user-42',
      page: 2,
      perPage: 24,
      locale: 'us',
      contentFilter: 'high',
    })

    const calledUrl: URL = mockFetch.mock.calls[0][0]

    expect(calledUrl.origin).toBe('https://api.klipy.com')
    expect(calledUrl.pathname).toBe('/api/v1/abc123/gifs/search')
    expect(calledUrl.searchParams.get('q')).toBe('dancing')
    expect(calledUrl.searchParams.get('customer_id')).toBe('user-42')
    expect(calledUrl.searchParams.get('page')).toBe('2')
    expect(calledUrl.searchParams.get('per_page')).toBe('24')
    expect(calledUrl.searchParams.get('locale')).toBe('us')
    expect(calledUrl.searchParams.get('content_filter')).toBe('high')
  })

  it('returns body.data on a successful response', async () => {
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse<KlipyPage<KlipyItem>>({ result: true, data: fakePage }),
    )

    const client = new KlipyClient({ apiKey: 'abc123' })
    const result = await client.gifs.search({ q: 'cat' })

    expect(result).toEqual(fakePage)
  })

  it('throws when the HTTP response is not ok', async () => {
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ result: false, data: null }, false, 500),
    )

    const client = new KlipyClient({ apiKey: 'abc123' })

    await expect(client.gifs.search({ q: 'cat' })).rejects.toThrow('KLIPY API error: 500')
  })

  it('throws when the API responds with result: false', async () => {
    mockFetch.mockResolvedValueOnce(
      mockJsonResponse({ result: false, data: null }, true, 200),
    )

    const client = new KlipyClient({ apiKey: 'abc123' })

    await expect(client.gifs.search({ q: 'cat' })).rejects.toThrow('KLIPY API returned result: false')
  })
})
