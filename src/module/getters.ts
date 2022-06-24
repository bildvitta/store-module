import { Getters } from '../types'

type Item = {
  [key: string]: any
}

export default (idKey: keyof Item): Getters => {
  return {
    filters: state => state.filters,
    list: state => state.list,
    totalPages: state => state.totalPages,
    byId: state => id => state.list.find((item: Item) => item[idKey] === id)
  }
}
