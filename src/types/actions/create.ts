import { Item, ApiResponse } from '../index'

export interface CreateActionPayload {
  payload: Item
  url: string
}

export type CreateApiResponse = Pick<ApiResponse, 'result' | 'status'>
