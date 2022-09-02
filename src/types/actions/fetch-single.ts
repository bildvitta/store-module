import { Item, ApiResponse } from 'types'

export interface FetchSingleActionPayload {
  form: boolean
  id: string | number
  params: Item
  url: string
}

export type FetchSingleURL = Pick<FetchSingleActionPayload, 'form' | 'id'>

export type FetchSingleApiResponse = Omit<ApiResponse, 'results' | 'count'>
