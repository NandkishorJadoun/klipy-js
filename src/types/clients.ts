import type { ClipClient as _ClipClient } from '../clip-client'
import type { MediaClient } from '../media-client'
import type { MediaContentType, MediaPage, MediaPaginatedPage } from './index'

export type MediaClientFor<T extends MediaContentType>
  = MediaClient<MediaPaginatedPage<T>, MediaPage<T>>

export type GifClient = MediaClientFor<'gif'>
export type StickerClient = MediaClientFor<'sticker'>
export type MemeClient = MediaClientFor<'meme'>
export type EmojiClient = MediaClientFor<'emoji'>

export type ClipClient = _ClipClient
