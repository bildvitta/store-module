import { Item, ReplaceUpdateApiResponse } from '../index'

export interface ReplaceActionPayload {
  id: string | number
  payload: Item
  url: string
}

export type ReplaceURL = Pick<ReplaceActionPayload, 'id'>

export type ReplaceApiResponse = ReplaceUpdateApiResponse