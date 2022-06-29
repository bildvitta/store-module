import {
  ApiService,
  CallbackFn,
  NamespacedState,
  //
  FetchListActionPayload,
  FetchFiltersActionPayload,
  FetchSingleActionPayload,
  DestroyActionPayload,
  FetchFieldOptionsActionPayload,
  UpdateActionPayload,
  ReplaceActionPayload,
  CreateActionPayload
} from './index'

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
  replaceURL: CallbackFn
  createURL: string
}

export type PayloadActionType =
  FetchListActionPayload |
  DestroyActionPayload |
  FetchFiltersActionPayload |
  FetchSingleActionPayload |
  FetchFieldOptionsActionPayload |
  UpdateActionPayload |
  ReplaceActionPayload |
  CreateActionPayload
