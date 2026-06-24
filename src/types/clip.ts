import type { Meta, Pagination, Rendition } from '.'

export type ClipRendition = Omit<Rendition, 'url'>
export interface ClipFormats {
  mp4: ClipRendition
  gif: ClipRendition
  webp: ClipRendition
}

export interface ClipFile {
  mp4: string
  gif: string
  webp: string
}

export interface ClipItem {
  url: string
  title: string
  slug: string
  file: ClipFile
  file_meta: ClipFormats
  tags: string[]
  type: 'clip'
  blur_preview: string
}

export interface ClipPage {
  data: ClipItem[]
  meta: Meta
}

export interface ClipPaginatedPage extends ClipPage, Pagination { }
