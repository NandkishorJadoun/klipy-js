type ContentFilter = 'off' | 'low' | 'medium' | 'high'
type FormatFilter = 'gif' | 'webp' | 'jpg' | 'mp4' | 'webm'

export interface GifPaginationParams {
  page?: number
  perPage?: number
}

export interface GifSearchParams extends GifPaginationParams {
  q: string
  customerId?: string
  locale?: string
  contentFilter?: ContentFilter
  formatFilter?: FormatFilter
}

export interface GifTrendingParams extends GifPaginationParams {
  customerId?: string
  locale?: string
  contentFilter?: ContentFilter
  formatFilter?: FormatFilter
}

export interface GifRecentParams extends GifPaginationParams {
  customerId: string
}

export interface GifCategoriesParams {
  locale?: string
}

export interface GifItemsParams {
  slugs: string
}
