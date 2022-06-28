type Item = {
  [key: string]: any
}

export interface FetchListActionPayload {
  filters: Item
  increment: boolean
  limit: number
  ordering: unknown[]
  page: number
  search: string
  url: string
}
