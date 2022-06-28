import { Item } from '../index'

export interface ReplaceActionPayload {
  id: string | number
  payload: Item
  url: string
}
