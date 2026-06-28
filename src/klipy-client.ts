import type { EmojiClient, GifClient, MemeClient, StickerClient } from './types/clients'
import { ClipClient } from './clip-client'
import { HttpClient } from './http-client'
import { MediaClient } from './media-client'

export interface KlipyClientOptions {
  apiKey: string
}

export interface SuggestionParams {
  q: string
  limit?: number
}

export class KlipyClient {
  readonly gifs: GifClient
  readonly stickers: StickerClient
  readonly memes: MemeClient
  readonly emojis: EmojiClient
  readonly clips: ClipClient
  private readonly http: HttpClient

  constructor({ apiKey }: KlipyClientOptions) {
    if (!apiKey) {
      throw new Error('KlipyClient requires an apiKey')
    }

    this.http = new HttpClient({ apiKey })

    this.gifs = new MediaClient(this.http, 'gifs')
    this.stickers = new MediaClient(this.http, 'stickers')
    this.memes = new MediaClient(this.http, 'memes')
    this.emojis = new MediaClient(this.http, 'emojis')
    this.clips = new ClipClient(this.http)
  }

  searchSuggestions(params: SuggestionParams): Promise<string[]> {
    return this.http.get<string[]>(
      `/search-suggestions/${encodeURIComponent(params.q)}`,
      { limit: params.limit },
    )
  }

  autocomplete(params: SuggestionParams): Promise<string[]> {
    return this.http.get<string[]>(
      `/autocomplete/${encodeURIComponent(params.q)}`,
      { limit: params.limit },
    )
  }
}
