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
  destroyURL: CallbackFn
  fetchFieldOptionsURL: string
  fetchFiltersURL: string
  fetchListURL: string
  fetchSingleURL: CallbackFn
  idKey: string,
  updateURL: CallbackFn
}
