import { Item, ApiResponse } from 'types'

export interface FetchSingleActionPayload {
  form: boolean
  id: string
  params: Item
  url: string
}

export type FetchSingleApiResponse = Omit<ApiResponse, 'results' | 'count'>
