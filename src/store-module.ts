import {
  // ApiService,
  ActionsFnParams,
  ApiService,
  Getters,
  ModuleOptions,
  NamespacedState,
  State,
  StoreModule,
  StoreModuleOptions,
  StoreModuleAdapter,
  Actions2,
  GlobalStoreVariable,
  GetNormalizedNamespaced
} from 'types'

import { dispatch } from './utils'

import {
  state,
  getters,
  // actions
  destroy,
  fetchList,
  fetchFilters,
  fetchSingle,
  fetchFieldOptions,
  update,
  replace,
  create,
} from './module'

export default class {
  private adapter: StoreModuleAdapter
  private apiService: ApiService
  private getters: Getters
  private idKey: string = 'uuid'
  private isPinia: boolean
  // private perPage: number
  private state: State
  private modules: Record<string, StoreModule> = {}

  private globalStoreVariable: GlobalStoreVariable = {
    state: {},
    getters: {},
    dispatch,
    _actions: {}
  }

  constructor (private options: StoreModuleOptions) {
    this.adapter = this.options.adapter
    this.apiService = this.options.apiService
    this.getters = this.options.getters
    this.idKey = this.options.idKey
    this.isPinia = (this.adapter?.name || 'pinia') === 'pinia'
    // this.perPage = _this.options.perPage
    this.state = this.options.state
  }

  public getModules (): Record<string, StoreModule> {
    return this.modules
  }

  public getStoreModule (resource: keyof NamespacedState, options: ModuleOptions): StoreModule {
    const actionsPayload: ActionsFnParams = {
      apiService: this.apiService,
      idKey: this.idKey,
      isPinia: this.isPinia,
      options,
      resource
    }

    const idKey = options.idKey || this.idKey

    const store: StoreModule = {
      // namespaced existe somente no vuex
      ...(!this.isPinia && { namespaced: true }),

      state: {
        ...state(),
        ...this.state
      },

      getters: {
        ...getters(idKey),
        ...this.getters
      },

      actions: {
        destroy: destroy(actionsPayload),
        fetchFieldOptions: fetchFieldOptions(actionsPayload),
        fetchFilters: fetchFilters(actionsPayload),
        fetchList: fetchList(actionsPayload),
        fetchSingle: fetchSingle(actionsPayload),
        update: update(actionsPayload),
        replace: replace(actionsPayload),
        create: create(actionsPayload)
      }
    }

    this.modules[resource] = store

    return store
  }

  public getGlocalStoreVariable (): GlobalStoreVariable {
    for (const key in this.modules) {
      const module = this.modules[key]

      Object.assign(
        this.globalStoreVariable.state,
        this.getNormalizedNamespacedStore({ key, payload: module.state })
      )

      Object.assign(
        this.globalStoreVariable.getters,
        this.getNormalizedNamespacedStore({ key, payload: module.getters })
      )

      Object.assign(
        this.globalStoreVariable._actions,
        this.getNormalizedNamespacedStore({ key, payload: module.actions })
      )
    }

    return this.globalStoreVariable
  }

  private getNormalizedNamespacedStore (params: GetNormalizedNamespaced) {
    const { key, payload } = params

    const object: Record<string, unknown> = {}

    for (const stateKey in payload) {
      const typedKey = stateKey as keyof (State | Getters | Actions2)
      const state = payload[typedKey]

      object[`${key}/${typedKey}`] = state
    }

    return object
  }
}
