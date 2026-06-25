import type { HttpClient } from './http-client'
import type { CategoriesData } from './types'
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

export class MediaClient<TPage, TItem> {
  constructor(
    private readonly api: HttpClient,
    private readonly resource: string,
  ) { }

  search(params: MediaSearchParams): Promise<TPage> {
    return this.api.get<TPage>(`/${this.resource}/search`, {
      q: params.q,
      customer_id: params.customerId,
      page: params.page,
      per_page: params.perPage,
      locale: params.locale,
      content_filter: params.contentFilter,
      format_filter: params.formatFilter,
    })
  }

  trending(params: MediaTrendingParams): Promise<TPage> {
    return this.api.get<TPage>(`/${this.resource}/trending`, {
      customer_id: params.customerId,
      page: params.page,
      per_page: params.perPage,
      locale: params.locale,
      content_filter: params.contentFilter,
      format_filter: params.formatFilter,
    })
  }

  categories(params: MediaCategoriesParams): Promise<CategoriesData> {
    return this.api.get<CategoriesData>(`/${this.resource}/categories`, {
      locale: params.locale,
    })
  }

  recent(params: MediaRecentParams): Promise<TPage> {
    return this.api.get<TPage>(`/${this.resource}/recent/${params.customerId}`, {
      page: params.page,
      per_page: params.perPage,
    })
  }

  items(params: MediaItemsParams): Promise<TItem> {
    return this.api.get<TItem>(`/${this.resource}/items`, {
      slugs: params.slugs,
    })
  }

  hideFromRecents(params: MediaHideFromRecentsParams): Promise<void> {
    return this.api.delete<void>(`/${this.resource}/recent/${params.customerId}`, {
      slug: params.slug,
      customer_id: params.customerId,
    })
  }

  shareTrigger(params: MediaShareTriggerParams): Promise<void> {
    return this.api.post<void>(`/${this.resource}/share/${params.slug}`, {
      customer_id: params.customerId,
      q: params.q,
    })
  }

  report(params: MediaReportParams): Promise<void> {
    return this.api.post<void>(`/${this.resource}/report/${params.slug}`, {
      customer_id: params.customerId,
      reason: params.reason,
    })
  }
}
