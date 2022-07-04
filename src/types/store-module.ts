import {
  ApiService,
  Getters,
  State,
  FactoryActions,
  ActionsPayload,
  Actions,
  ApiResponse,
  FetchFieldOptionsApiResponse
} from "./index"

import { AxiosResponse } from 'axios'

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
  namespaced?: boolean
  state: State
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
  key: string
  payload: State | Getters | FactoryActions
}

export interface GlobalStoreVariableState {
  [key: `${string}/list`]: State['list']
  [key: `${string}/totalPages`]: State['totalPages']
  [key: `${string}/filters`]: State['filters']
}

export interface GlobalStoreVariableGetters {
  [key: `${string}/list`]: Getters['list']
  [key: `${string}/totalPages`]: Getters['totalPages']
  [key: `${string}/filters`]: Getters['filters']
  [key: `${string}/byId`]: Getters['byId']
}

export interface GlobalStoreVariableActions {
  [key: `${string}/create`]: Actions['create']
  [key: `${string}/destroy`]: Actions['destroy']
  [key: `${string}/fetchFieldOptions`]: Actions['fetchFieldOptions']
  [key: `${string}/fetchFilters`]: Actions['fetchFilters']
  [key: `${string}/fetchList`]: Actions['fetchList']
  [key: `${string}/fetchSingle`]: Actions['fetchSingle']
  [key: `${string}/replace`]: Actions['replace']
  [key: `${string}/update`]: Actions['update']
}

export interface GlobalStoreVariable {
  _actions: GlobalStoreVariableActions
  getters: GlobalStoreVariableGetters
  state: GlobalStoreVariableState
  dispatch: (
    resource: keyof GlobalStoreVariableActions,
    payload: ActionsPayload
  ) => Promise<AxiosResponse<ApiResponse | FetchFieldOptionsApiResponse>>
}
