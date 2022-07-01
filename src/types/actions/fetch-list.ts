import { Item, ApiResponse } from 'types'

export interface FetchListActionPayload {
  filters: Item
  increment: boolean
  limit: number
  ordering: unknown[]
  page: number
  search: string
  url: string
}

export type FetchListApiResponse = Omit<ApiResponse, 'result'>
