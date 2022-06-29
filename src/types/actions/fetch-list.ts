import { Item } from '../index'

export interface FetchListActionPayload {
  filters: Item
  increment: boolean
  limit: number
  ordering: unknown[]
  page: number
  search: string
  url: string
}
