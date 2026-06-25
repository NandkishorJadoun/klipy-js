import type { EmojiClient, GifClient, MemeClient, StickerClient } from './types/clients'
import { ClipClient } from './clip-client'
import { HttpClient } from './http-client'
import { MediaClient } from './media-client'

export interface KlipyClientOptions {
  apiKey: string
}

export class KlipyClient {
  readonly gifs: GifClient
  readonly stickers: StickerClient
  readonly memes: MemeClient
  readonly emojis: EmojiClient
  readonly clips: ClipClient

  constructor({ apiKey }: KlipyClientOptions) {
    if (!apiKey) {
      throw new Error('KlipyClient requires an apiKey')
    }

    const http = new HttpClient({ apiKey })

    this.gifs = new MediaClient(http, 'gifs')
    this.stickers = new MediaClient(http, 'stickers')
    this.memes = new MediaClient(http, 'memes')
    this.emojis = new MediaClient(http, 'emojis')
    this.clips = new ClipClient(http)
  }
}
