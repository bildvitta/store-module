type ItemOfItems = Record<string, object>

export interface FetchFiltersParams {
  filters?: ItemOfItems
  increment?: boolean
  ordering?: unknown[]
  page: number
  limit: number
  search?: string
  url?: string
}
