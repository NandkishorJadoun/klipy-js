export type MediaContentType = 'gif' | 'sticker' | 'meme' | 'emoji'

export interface Meta {
  item_min_width: number
  ad_max_resize_percent: number
}

export interface Pagination {
  current_page: number
  per_page: number
  has_next: boolean
}

export interface Rendition {
  url: string
  width: number
  height: number
  size: number
}

export interface MediaFormats {
  gif: Rendition
  webp: Rendition
  jpg: Rendition
  png: Rendition
  mp4: Rendition
  webm: Rendition
}

export type GifFormats = Pick<MediaFormats, 'gif' | 'webp' | 'jpg' | 'mp4' | 'webm'>
export type StickerFormats = Pick<MediaFormats, 'gif' | 'webp' | 'webm' | 'png'>
export type MemeFormats = Pick<MediaFormats, 'webp' | 'png'>
export type EmojiFormats = Pick<MediaFormats, 'webp' | 'png'>

export interface FormatVariantMap {
  gif: GifFormats
  sticker: StickerFormats
  meme: MemeFormats
  emoji: EmojiFormats
}

export interface MediaItem<T extends MediaContentType> {
  id: number
  slug: string
  title: string
  file: MediaFile<FormatVariantMap[T]>
  tags: string[]
  type: T
  blur_preview: string
}

export interface MediaFile<TFormat> {
  hd: TFormat
  md: TFormat
  sm: TFormat
  xs: TFormat
}

export interface MediaPage<T extends MediaContentType> {
  data: MediaItem<T>[]
  meta: Meta
}

export interface MediaPaginatedPage<T extends MediaContentType>
  extends MediaPage<T>, Pagination { }

export interface CategoriesData {
  locale: string
  categories: Category[]
}

export interface Category {
  category: string
  query: string
  preview_url: string
}
