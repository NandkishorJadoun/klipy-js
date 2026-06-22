import type { KlipyItem, KlipyPage, KlipyResponse } from './types'

export interface KlipyClientOptions {
  apiKey: string
}

export interface GifSearchParams {
  q: string
  customerId?: string
  page?: number
  perPage?: number
  locale?: string
  contentFilter?: 'off' | 'low' | 'medium' | 'high'
}

export class KlipyClient {
  private readonly apiKey: string
  private readonly baseUrl: string

  constructor(options: KlipyClientOptions) {
    if (!options.apiKey) {
      throw new Error('KlipyClient requires an apiKey')
    }
    this.apiKey = options.apiKey
    this.baseUrl = 'https://api.klipy.com/api/v1'
  }

  private async request<T>(path: string, params: Record<string, string | number | undefined>): Promise<T> {
    const url = new URL(`${this.baseUrl}/${this.apiKey}${path}`)

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error(`KLIPY API error: ${res.status} ${res.statusText}`)
    }

    const body = await res.json() as KlipyResponse<T>

    if (!body.result) {
      throw new Error('KLIPY API returned result: false')
    }

    return body.data
  }

  gifs = {
    search: (params: GifSearchParams): Promise<KlipyPage<KlipyItem>> =>
      this.request<KlipyPage<KlipyItem>>('/gifs/search', {
        q: params.q,
        customer_id: params.customerId,
        page: params.page,
        per_page: params.perPage,
        locale: params.locale,
        content_filter: params.contentFilter,
      }),
  }
}
