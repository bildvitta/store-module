import { State, Item } from 'types'
export interface Getters {
  byId: (state: State) => (id: string | number) => Item | undefined
}
