import { Item } from '../index'

export interface FetchFieldOptionsActionPayload {
  field: string
  params: Item
  url: string
}
