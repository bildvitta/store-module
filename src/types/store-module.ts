import {
  ApiService,
  Getters,
  State,
  FactoryActions,
  Actions,
} from "./index"

import { ActionContext } from 'vuex'
import { StoreDefinition } from 'pinia'

export type ActionsFnHandlerTuple<T> = [ActionContext<State, any> | T, T]

export type CallbackFn = (...url: unknown[]) => string

// export type PiniaStoreDefinition = (id: string, options: StoreModule) => void

export type PiniaStoreDefinition = StoreDefinition<string, State, Getters, Actions>

export type StoreModuleAdapter = 'pinia' | 'vuex'

export type ExternalActions = Record<string, <T extends unknown>(...args: T[]) => unknown>
// export type ExternalGetters = Record<string, >

export interface StoreModuleOptions {
  actions: ExternalActions
  adapter: StoreModuleAdapter
  apiService: ApiService
  getters: Getters
  idKey: string
  perPage: number
  state: State
}

export interface StoreModule {
  namespaced?: boolean
  state: () => State
  getters: Getters
  actions: FactoryActions
}

export interface Item {
  [key: string]: any
}

export interface ItemOfItem {
  [key: string]: Item
}

export interface GetNormalizedNamespaced {
  payload: string[]
  module: PiniaStoreDefinition
}
