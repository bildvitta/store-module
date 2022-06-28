import { Item } from '../index'

export interface UpdateActionPayload {
  id: string | number
  payload: Item
  url: string
}
