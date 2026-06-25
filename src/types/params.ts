export type ContentFilter = 'off' | 'low' | 'medium' | 'high'
export type FormatFilter = 'gif' | 'webp' | 'jpg' | 'mp4' | 'webm'

export type MediaReportReasons = 'nudity' | 'violence' | 'hate_speech' | 'harassment' | 'spam' | 'misinformation' | 'copyright' | 'offensive' | 'illegal' | 'broken'
  | 'low_quality' | 'not_relevant'

export interface MediaPaginationParams {
  page?: number
  perPage?: number
}

export interface MediaTrendingParams extends MediaPaginationParams {
  customerId?: string
  locale?: string
  formatFilter?: FormatFilter
  contentFilter?: ContentFilter
}

export interface MediaSearchParams extends MediaTrendingParams {
  q: string
}

export interface MediaRecentParams extends MediaPaginationParams {
  customerId: string
}

export interface MediaCategoriesParams {
  locale?: string
}

export interface MediaItemsParams {
  slugs: string
}

export interface MediaHideFromRecentsParams {
  slug: string
  customerId: string
}

export interface MediaShareTriggerParams {
  slug: string
  q?: string
  customerId?: string
}

export interface MediaReportParams {
  slug: string
  reason: MediaReportReasons
  customerId?: string
}
