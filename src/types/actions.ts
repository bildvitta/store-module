import {
  ApiService,
  CallbackFn,
  NamespacedState,
  ItemOfItem,
  Item,
  ActionsFnHandlerTuple,

  // API RESPONSE
  FetchFieldOptionsApiResponse,
  UpdateApiResponse,
  ReplaceApiResponse,
  CreateApiResponse,
  DestroyApiResponse,
  FetchFiltersApiResponse,
  FetchListApiResponse,
  FetchSingleApiResponse,

  // ACTIONS PAYLOAD
  FetchListActionPayload,
  FetchFiltersActionPayload,
  FetchSingleActionPayload,
  DestroyActionPayload,
  FetchFieldOptionsActionPayload,
  UpdateActionPayload,
  ReplaceActionPayload,
  CreateActionPayload
} from 'types'

import { AxiosResponse } from 'axios'

export interface ActionsFnParams {
  apiService: ApiService,
  idKey: string
  isPinia: boolean
  options: ModuleOptions
  perPage?: number
  resource: keyof NamespacedState
}

export type ActionsPayload = (
  FetchListActionPayload |
  FetchFiltersActionPayload |
  FetchSingleActionPayload |
  DestroyActionPayload |
  FetchFieldOptionsActionPayload |
  UpdateActionPayload |
  ReplaceActionPayload |
  CreateActionPayload
)

export interface ModuleOptions {
  destroyURL: CallbackFn
  fetchFieldOptionsURL: string
  fetchFiltersURL: string
  fetchListURL: string
  fetchSingleURL: CallbackFn
  idKey: string,
  updateURL: CallbackFn
  replaceURL: CallbackFn
  createURL: string
}

export type PayloadActionType = (
  FetchListActionPayload |
  DestroyActionPayload |
  FetchFiltersActionPayload |
  FetchSingleActionPayload |
  FetchFieldOptionsActionPayload |
  UpdateActionPayload |
  ReplaceActionPayload |
  CreateActionPayload
)

export type ActionCallback<T, A> = (
  ...args: ActionsFnHandlerTuple<T>
) => Promise<AxiosResponse<A>>

export interface Actions {
  destroy: ActionCallback<DestroyActionPayload, DestroyApiResponse>
  fetchFieldOptions: ActionCallback<FetchFieldOptionsActionPayload, FetchFieldOptionsApiResponse>
  fetchFilters: ActionCallback<FetchFiltersActionPayload, FetchFiltersApiResponse>
  fetchList: ActionCallback<FetchListActionPayload, FetchListApiResponse>
  fetchSingle: ActionCallback<FetchSingleActionPayload, FetchSingleApiResponse>
  update: ActionCallback<UpdateActionPayload, UpdateApiResponse>
  replace: ActionCallback<ReplaceActionPayload, ReplaceApiResponse>
  create: ActionCallback<CreateActionPayload, CreateApiResponse>
}

export type ReplaceUpdateApiResponse = Pick<ApiResponse, 'fields' | 'result' | 'status'>

export interface ApiResponseStatus {
  code: 200 | 401 | 403 | 404 | 500
  text?: string
}

export interface ApiResponse {
  count?: number
  errors?: ItemOfItem
  fields?: ItemOfItem
  metadata?: ItemOfItem
  results?: Item[]
  result?: Item
  status: ApiResponseStatus
}
