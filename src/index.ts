import type { KlipyCategoryPage, KlipyItemsPage, KlipyPage, KlipyResponse } from './types'
import type { GifCategoriesParams, GifItemsParams, GifRecentParams, GifSearchParams, GifTrendingParams } from './types/params'

export interface KlipyClientOptions {
  apiKey: string
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
      headers: {
        'Content-Type': 'application/json',
      },
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
    search: (params: GifSearchParams): Promise<KlipyPage> =>
      this.request<KlipyPage>('/gifs/search', {
        q: params.q,
        customer_id: params.customerId,
        page: params.page,
        per_page: params.perPage,
        locale: params.locale,
        content_filter: params.contentFilter,
        format_filter: params.formatFilter,
      }),

    trending: (params: GifTrendingParams): Promise<KlipyPage> =>
      this.request<KlipyPage>('/gifs/trending', {
        customer_id: params.customerId,
        page: params.page,
        per_page: params.perPage,
        locale: params.locale,
        content_filter: params.contentFilter,
        format_filter: params.formatFilter,
      }),

    categories: (params: GifCategoriesParams): Promise<KlipyCategoryPage> =>
      this.request<KlipyCategoryPage>('/gifs/categories', {
        locale: params.locale,
      }),

    recent: (params: GifRecentParams): Promise<KlipyPage> =>
      this.request<KlipyPage>(`/gifs/recent/${params.customerId}`, {
        page: params.page,
        per_page: params.perPage,
      }),

    items: (params: GifItemsParams): Promise<KlipyItemsPage> =>
      this.request<KlipyItemsPage>('/gifs/items', {
        slugs: params.slugs,
      }),
  }
}
