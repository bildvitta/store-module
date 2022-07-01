import { Item, ReplaceUpdateApiResponse } from '../index'

export interface UpdateActionPayload {
  id: string | number
  payload: Item
  url: string
}

export type UpdateApiResponse = ReplaceUpdateApiResponse
