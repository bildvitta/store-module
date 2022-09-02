import { Item, ReplaceUpdateApiResponse } from '../index'

export interface UpdateActionPayload {
  id: string | number
  payload: Item
  url: string
}

export type UpdateURL = Pick<UpdateActionPayload, 'id'>

export type UpdateApiResponse = ReplaceUpdateApiResponse
