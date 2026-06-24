export interface KlipyResponse<T> {
  result: boolean
  data: T
}

export interface HttpClientOptions {
  apiKey: string
}

export type HttpMethod = 'GET' | 'POST' | 'DELETE'

export class HttpClient {
  constructor(private readonly options: HttpClientOptions, private readonly baseUrl = 'https://api.klipy.com/api/v1') { }

  private async request<T>(
    path: string,
    options: {
      method: HttpMethod
      query?: Record<string, string | number | boolean | undefined>
      body?: unknown
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

    const headers: Record<string, string> = {}
    if (body) {
      headers['Content-Type'] = 'application/json'
    }

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        `KLIPY API error: ${res.status} ${res.statusText}
                ${text}`,
      )
    }

    const json = await res.json() as KlipyResponse<T>

    if (!json.result) {
      throw new Error('KLIPY API returned result: false')
    }

    return json.data
  }

  get<T>(
    path: string,
    query?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    return this.request<T>(path, {
      method: 'GET',
      query,
    })
  }

  post<T>(
    path: string,
    body?: unknown,
  ): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body,
    })
  }

  delete<T>(
    path: string,
    body?: unknown,
  ): Promise<T> {
    return this.request<T>(path, {
      method: 'DELETE',
      body,
    })
  }
}
