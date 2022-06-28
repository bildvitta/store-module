import { ApiService, CallbackFn, NamespacedState } from './index'

export interface ActionsFnParams {
  apiService: ApiService,
  idKey: string
  isPinia: boolean
  options: ModuleOptions
  perPage?: number
  resource: keyof NamespacedState
}

export interface ModuleOptions {
  idKey: string,
  fetchListURL: string
  fetchFiltersURL: string
  destroyURL: CallbackFn
  fetchSingleURL: CallbackFn
  fetchFieldOptionsURL: string
}
