import { Item, ApiResponse } from 'types'

export interface FetchFiltersActionPayload {
  params: Item
  url: string
}

export type FetchFiltersApiResponse = Pick<ApiResponse, 'fields' | 'status'>
