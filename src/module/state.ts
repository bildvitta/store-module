import { State } from 'types'

export default (): State => {
  return {
    filters: {},
    list: [],
    totalPages: 0
  }
}
