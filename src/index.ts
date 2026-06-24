import type { MediaPage, MediaPaginatedPage } from './types'
import { ClipClient } from './clip-client'
import { HttpClient } from './http-client'
import { MediaClient } from './media-client'

export type { HttpClientOptions, KlipyResponse } from './http-client'

export type {
  CategoriesData,
  Category,
  MediaContentType,
  MediaFile,
  MediaFormats,
  MediaItem,
  MediaPage,
  MediaPaginatedPage,
  Meta,
  Pagination,
} from './types'

export type {
  MediaCategoriesParams,
  MediaHideFromRecentsParams,
  MediaItemsParams,
  MediaPaginationParams,
  MediaRecentParams,
  MediaReportParams,
  MediaSearchParams,
  MediaShareTriggerParams,
  MediaTrendingParams,
} from './types/params'

export interface KlipyClientOptions {
  apiKey: string
}

export class KlipyClient {
  readonly gifs: MediaClient<MediaPaginatedPage<'gif'>, MediaPage<'gif'>>
  readonly stickers: MediaClient<MediaPaginatedPage<'sticker'>, MediaPage<'sticker'>>
  readonly memes: MediaClient<MediaPaginatedPage<'meme'>, MediaPage<'meme'>>
  readonly emojis: MediaClient<MediaPaginatedPage<'emoji'>, MediaPage<'emoji'>>
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
