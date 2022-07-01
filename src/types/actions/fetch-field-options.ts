import { Item } from '../index'

export interface FetchFieldOptionsActionPayload {
  field: string
  params: Item
  url: string
}

export interface SelectOptions {
  label: string
  value: string | number
}

export interface FetchFieldOptionsApiResponse {
  count?: number
  hasNextPage?: boolean
  results: SelectOptions[]
}
