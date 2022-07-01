import { Item, ReplaceUpdateApiResponse } from '../index'

export interface ReplaceActionPayload {
  id: string | number
  payload: Item
  url: string
}

export type ReplaceApiResponse = ReplaceUpdateApiResponse