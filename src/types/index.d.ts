export interface KlipyMediaRendition {
  url: string
  width: number
  height: number
  size: number
}

export interface KlipyMediaSizeVariant {
  gif: KlipyMediaRendition
  webp: KlipyMediaRendition
  jpg: KlipyMediaRendition
  mp4: KlipyMediaRendition
  webm: KlipyMediaRendition
}

export interface KlipyMediaFile {
  hd: KlipyMediaSizeVariant
  md: KlipyMediaSizeVariant
  sm: KlipyMediaSizeVariant
  xs: KlipyMediaSizeVariant
}

export type KlipyContentType = 'gif' | 'sticker' | 'clip' | 'meme'

export interface KlipyItem {
  id: number
  slug: string
  title: string
  file: KlipyMediaFile
  tags: string[]
  type: KlipyContentType
  blur_preview: string
}

export interface KlipyPage {
  data: KlipyItem[]
  current_page: number
  per_page: number
  has_next: boolean
  meta: {
    item_min_width: number
    ad_max_resize_percent: number
  }
}

export interface KlipyCategoryPage {
  locale: string
  categories: KlipyCategoryItem[]
}

export interface KlipyCategoryItem {
  category: string
  query: string
  preview_url: string
}

export interface KlipyItemsPage {
  data: KlipyItem[]
  meta: {
    item_min_width: number
    ad_max_resize_percent: number
  }
}

export interface KlipyResponse<T> {
  result: boolean
  data: T
}
