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

export type PiniaStoreDefinition = StoreDefinition<string, State, Getters, Actions>

export type StoreModuleAdapter = 'pinia' | 'vuex'

export type ExternalActions = Record<string, <T extends unknown>(...args: T[]) => unknown>
export type ExternalState = Record<string, unknown>
export type ExternalGetters = Record<keyof (State | ExternalState), unknown> | {}

export interface StoreModuleOptions {
  adapter: StoreModuleAdapter
  apiService: ApiService
  idKey?: string
  perPage?: number
}

export interface StoreModuleClass {
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

export type AvailableAdapters = ['pinia', 'vuex']
