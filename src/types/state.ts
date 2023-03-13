import { ItemOfItem } from 'types'
import { AxiosResponse, AxiosError } from 'axios'

export interface FieldsState {
  name: string
  type: 'boolean' | 'select' | 'text' | 'nested'
  props?: ItemOfItem
  label?: string
  validators?: string[]
  filters?: boolean | Filters
}

export interface Filters {
  searchable: boolean,
  field?: Omit<Partial<FieldsState>, 'filters'>
}

const field: FieldsState = {
  name: 'users',
  filters: {
    searchable: true
  }
}

/*
  * minLength
  * maxLength
  * email
  * document
  * personal-document
  * company-document
  * postal-code
  * minItens
  * maxItens
  * required
  * phone
  * max
  * min
  * 
*/

export interface State {
  filters: ItemOfItem
  list: ItemOfItem[]
  totalPages: number
  fields: FieldsState
  dynamicOptions?: Record<string, DynamicOptions>
}

export interface DynamicOptions {
  isFetching: boolean
  hasError: boolean

  onFetchSuccess?: (successResponse: AxiosResponse) => unknown,
  onFetching?: (isFetching: boolean) => unknown
  onFetchError?: (errorResponse: AxiosError) => unknown
}

// Estende "State" deixando todos os tipos dentro de state como opcional
export interface NamespacedState extends Partial<State> {
  state?: Record<string, State>
}
