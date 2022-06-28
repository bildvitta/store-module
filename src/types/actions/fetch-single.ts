import { Item } from '../index'

export interface FetchSingleActionPayload {
  form: boolean
  id: string
  params: Item
  url: string
}
