import type { KlipyApiErrorResponse, KlipyResponse } from './types'

export interface HttpClientOptions {
  apiKey: string
}

export type HttpMethod = 'GET' | 'POST' | 'DELETE'

export class KlipyApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`KLIPY API error: ${status}`)
    this.name = 'KlipyApiError'
  }
}

export class HttpClient {
  constructor(private readonly options: HttpClientOptions, private readonly baseUrl = 'https://api.klipy.com/api/v1') { }

  private async request<T>(
    path: string,
    options: {
      method: HttpMethod
      query?: Record<string, string | number | undefined>
      body?: Record<string, string | undefined>
    },
  ): Promise<T> {
    const {
      method = 'GET',
      query = {},
      body,
    } = options ?? {}

    const url = new URL(`${this.baseUrl}/${this.options.apiKey}${path}`)

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    }

    const headers = { 'Content-Type': 'application/json' }

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      let errorBody: unknown
      try {
        const parsed = await res.json() as KlipyApiErrorResponse
        errorBody = parsed.errors
      }
      catch {
        errorBody = await res.text().catch(() => undefined)
      }
      throw new KlipyApiError(res.status, errorBody)
    }

    const json = await res.json() as KlipyResponse<T>

    return json.data
  }

  get<T>(
    path: string,
    query?: Record<string, string | number | undefined>,
  ): Promise<T> {
    return this.request<T>(path, {
      method: 'GET',
      query,
    })
  }

  post<T>(
    path: string,
    body?: Record<string, string | undefined>,
  ): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body,
    })
  }

  delete<T>(
    path: string,
    query?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>(path, {
      method: 'DELETE',
      query,
    })
  }
}
