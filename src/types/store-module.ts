import { ApiService, Getters, State, NamespacedState } from "./index"

type CallbackFn = (...url: unknown[]) => string

export interface StoreModuleOptions {
  apiService: ApiService
  getters: Getters
  idKey: string
  perPage: number
  state: State
}

export interface StoreModule {
  namespaced: boolean
  state: State
  getters: Getters
  // TODO Alterar para um type actions
  actions: object
}

export interface ModuleOptions {
  destroyURL: CallbackFn
}

export interface ActionsFnParams {
  isPinia: boolean
  resource: keyof NamespacedState
  options: ModuleOptions
  apiService: ApiService,
  idKey: string
}
