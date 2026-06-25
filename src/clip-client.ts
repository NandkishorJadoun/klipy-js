import type { HttpClient } from './http-client'
import type { CategoriesData } from './types'
import type { ClipPage, ClipPaginatedPage } from './types/clip'
import type {
  MediaCategoriesParams,
  MediaHideFromRecentsParams,
  MediaItemsParams,
  MediaRecentParams,
  MediaReportParams,
  MediaSearchParams,
  MediaShareTriggerParams,
  MediaTrendingParams,
} from './types/params'

export class ClipClient {
  constructor(private readonly api: HttpClient) { }

  search(params: MediaSearchParams): Promise<ClipPaginatedPage> {
    return this.api.get<ClipPaginatedPage>('/clips/search', {
      q: params.q,
      customer_id: params.customerId,
      page: params.page,
      per_page: params.perPage,
      locale: params.locale,
      content_filter: params.contentFilter,
      format_filter: params.formatFilter,
    })
  }

  trending(params: MediaTrendingParams): Promise<ClipPaginatedPage> {
    return this.api.get<ClipPaginatedPage>('/clips/trending', {
      customer_id: params.customerId,
      page: params.page,
      per_page: params.perPage,
      locale: params.locale,
      content_filter: params.contentFilter,
      format_filter: params.formatFilter,
    })
  }

  categories(params: MediaCategoriesParams): Promise<CategoriesData> {
    return this.api.get<CategoriesData>('/clips/categories', {
      locale: params.locale,
    })
  }

  recent(params: MediaRecentParams): Promise<ClipPaginatedPage> {
    return this.api.get<ClipPaginatedPage>(`/clips/recent/${params.customerId}`, {
      page: params.page,
      per_page: params.perPage,
    })
  }

  items(params: MediaItemsParams): Promise<ClipPage> {
    return this.api.get<ClipPage>('/clips/items', {
      slugs: params.slugs,
    })
  }

  hideFromRecents(params: MediaHideFromRecentsParams): Promise<void> {
    return this.api.delete<void>(`/clips/recent/${params.customerId}`, {
      slug: params.slug,
      customer_id: params.customerId,
    })
  }

  shareTrigger(params: MediaShareTriggerParams): Promise<void> {
    return this.api.post<void>(`/clips/share/${params.slug}`, {
      customer_id: params.customerId,
      q: params.q,
    })
  }

  report(params: MediaReportParams): Promise<void> {
    return this.api.post<void>(`/clips/report/${params.slug}`, {
      customer_id: params.customerId,
      reason: params.reason,
    })
  }
}
