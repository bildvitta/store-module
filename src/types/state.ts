import { ItemOfItem } from 'types'

export interface State {
  filters: ItemOfItem
  list: ItemOfItem[]
  totalPages: number
}

// Estende "State" deixando todos os tipos dentro de state como opcional
export interface NamespacedState extends Partial<State> {
  state?: Record<string, State>
}
