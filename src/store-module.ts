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
  ActionsPayload
} from './types'

import { AxiosResponse } from 'axios'

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
  create
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
    dispatch: this.dispatch,
    _actions: {}
  }

  constructor (private options: StoreModuleOptions) {
    this.adapter = options.adapter
    this.apiService = options.apiService
    this.getters = options.getters
    this.idKey = options.idKey
    this.isPinia = (this.adapter?.name || 'pinia') === 'pinia'
    // this.perPage = _options.perPage
    this.state = options.state

    console.log(this.options, 'quantas vezes essa classe foi instanciada??? kkkk')
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

    // const actionFetchFilters = 

    const store: StoreModule = {
      namespaced: true,

      state: {
        ...state(),
        ...this.state
      },

      getters: {
        ...getters(idKey),
        ...this.getters
      },

      actions: {
        // destroy: destroy(actionsPayload),
        fetchFieldOptions: fetchFieldOptions(actionsPayload),
        // fetchFilters: fetchFilters(actionsPayload),
        // fetchList: fetchList(actionsPayload),
        // fetchSingle: fetchSingle(actionsPayload),
        update: update(actionsPayload),
        replace: replace(actionsPayload),
        create: create(actionsPayload)
      }
    }

    this.modules[resource] = store

    return store
  }

  public getGlocalStoreVariable () {
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
        this.globalStoreVariable._action,
        this.getNormalizedNamespacedStore({ key, payload: module.actions })
      )
    }
  }

  private getNormalizedNamespacedStore (params: GetNormalizedNamespaced) {
    const { key, payload } = params

    const object: Record<string, unknown> = {}

    for (const stateKey in payload) {
      const typedKey = stateKey
      const state = payload[typedKey]

      object[`${key}/${typedKey}`] = state
    }

    return object
  }

  private dispatch (resource: string, payload: ActionsPayload) {
    this.globalStoreVariable._actions[resource](payload)
  }
}

interface GetNormalizedNamespaced {
  key: string
  payload: State | Getters | any
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
interface GlobalStoreVariable {
  state: GlobalStoreVariableState
  getters: GlobalStoreVariableGetters
  [key: string]: any
}
