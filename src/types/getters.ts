import { State } from './state'

type Item = {
  [key: string]: any
}

export interface Getters {
  filters: (state: State) => Record<string, object>
  list: (state: State) => Item[]
  totalPages: (state: State) => number
  byId: (state: State) => (id: string | number) => Item | undefined
}
