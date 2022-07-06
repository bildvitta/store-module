import { Getters, Item } from 'types'

export default (idKey: keyof Item): Getters => {
  return {
    byId: state => id => state.list.find((item: Item) => item[idKey] === id)
  }
}
