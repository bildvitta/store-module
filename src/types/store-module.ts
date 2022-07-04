import {
  ApiService,
  Getters,
  State,
  Actions,
  ActionsPayload,
  Actions2,
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
  actions: Actions
}

export interface Item {
  [key: string]: any
}

export interface ItemOfItem {
  [key: string]: Item
}

export interface GetNormalizedNamespaced {
  key: string
  payload: State | Getters | Actions
}


type GlobalStoreVariableState = (
  Record<`${string}/${keyof State}`, State['list'] | State['totalPages'] | State['filters']>
)

type GlobalStoreVariableGetters = (
  Record<
    `${string}/${keyof Getters}`,
    Getters['list'] | Getters['totalPages'] | Getters['filters'] | Getters['byId']
  >
)

export interface GlobalStoreVariableActions {
  [key: `${string}/create`]: Actions2['create']
  [key: `${string}/destroy`]: Actions2['destroy']
  [key: `${string}/fetchFieldOptions`]: Actions2['fetchFieldOptions']
  [key: `${string}/fetchFilters`]: Actions2['fetchFilters']
  [key: `${string}/fetchList`]: Actions2['fetchList']
  [key: `${string}/fetchSingle`]: Actions2['fetchSingle']
  [key: `${string}/replace`]: Actions2['replace']
  [key: `${string}/update`]: Actions2['update']
}

export interface GlobalStoreVariable {
  _actions: GlobalStoreVariableActions
  getters: GlobalStoreVariableGetters
  state: GlobalStoreVariableState
  dispatch: (
    resource: keyof GlobalStoreVariableActions, payload: ActionsPayload
  ) => Promise<AxiosResponse<ApiResponse | FetchFieldOptionsApiResponse>>
}
