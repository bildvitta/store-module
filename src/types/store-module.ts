import {
  ApiService,
  Getters,
  State
} from "./index"

import { ActionContext } from 'vuex'

export type ActionsFnHandlerTuple<T> = [ActionContext<State, any> | T, T]

export type CallbackFn = (...url: unknown[]) => string


export interface StoreModuleAdapter {
  name: 'pinia' | 'vuex'
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
  // TODO Alterar para um type actions
  actions: object
}
export interface Item {
  [key: string]: any
}
