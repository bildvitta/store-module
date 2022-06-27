type Item = {
  [key: string]: any
}

export interface FetchListAction {
  filters: Item
  increment: boolean
  limit: number
  ordering: unknown[]
  page: number
  search: string
  url: string
}
