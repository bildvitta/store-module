import {
  ApiService,
  Getters,
  State,
  Actions
} from "./index"

import { ActionContext } from 'vuex'

export type ActionsFnHandlerTuple<T> = [ActionContext<State, any> | T, T]

export type CallbackFn = (...url: unknown[]) => string

export type PiniaStoreDefinition = (id: string, options: StoreModule) => void

export interface PiniaAdapter {
  // TODO alterar any para actions
  defineStore: PiniaStoreDefinition
}


export interface StoreModuleAdapter {
  name: 'pinia' | 'vuex',
  pinia: PiniaAdapter
}

export interface StoreModuleOptions {
  adapter: StoreModuleAdapter
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
  actions: Actions
}

export interface Item {
  [key: string]: any
}

export interface ItemOfItem {
  [key: string]: Item
}
