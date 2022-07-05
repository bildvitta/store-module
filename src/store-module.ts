import {
  // ApiService,
  ActionsFnParams,
  ApiService,
  Getters,
  type ModuleOptions,
  NamespacedState,
  State,
  type StoreModule,
  StoreModuleOptions,
  StoreModuleAdapter,
  Actions,
  GlobalStoreVariable,
  GetNormalizedNamespaced
} from 'types'

import { StoreDefinition } from 'pinia'

import { dispatch } from './utils'

import {
  state,
  // getters,
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
  // private getters: Getters
  private idKey: string = 'uuid'
  private isPinia: boolean
  private isVuex: boolean
  // private perPage: number
  private state: State
  private modules: Record<string, StoreModule> = {}

  private globalStoreVariable: GlobalStoreVariable = {
    _actions: {},
    dispatch,
    getters: {},
    state: {},
  }

  private publicProperties: Record<string, Record<string, any>> = {}

  constructor (private options: StoreModuleOptions) {
    this.adapter = this.options.adapter
    this.apiService = this.options.apiService
    // this.getters = this.options.getters
    this.idKey = this.options.idKey
    this.isPinia = (this.adapter?.name || 'pinia') === 'pinia'
    this.isVuex = !this.isPinia
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

    // const idKey = options.idKey || this.idKey

    const store: StoreModule = {
      // namespaced existe somente no vuex
      ...(this.isVuex && { namespaced: true }),

      state: () => {
        return {
          ...state(),
          ...this.state
        }
      },

      // getters: {
      //   ...getters(idKey),
      //   ...this.getters
      // },

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

    if (this.isPinia) {
      this.publicProperties[resource] = {
        actions: [...Object.keys(store.actions)],
        getters: [...Object.keys(store.getters || {})],
        state: [...Object.keys(store.state)]
      }
    }

    return store
  }

  public getGlocalStoreVariable (modules: Record<string, StoreModule>): GlobalStoreVariable {
    for (const key in modules) {
      const module = modules[key]

      Object.assign(
        this.globalStoreVariable.state,
        this.getNormalizedNamespacedStore({ key, payload: module.state() })
      )

      // Object.assign(
      //   this.globalStoreVariable.getters,
      //   this.getNormalizedNamespacedStore({ key, payload: module.getters })
      // )

      Object.assign(
        this.globalStoreVariable._actions,
        this.getNormalizedNamespacedStore({ key, payload: module.actions })
      )
    }

    return this.globalStoreVariable
  }

  getGlocalStoreVariableForPinia (modules: StoreDefinition<string, State, Getters, Actions>[]): GlobalStoreVariable {
    const globalVariable: GlobalStoreVariable = {
      _actions: {},
      state: {},
      dispatch,
      getters: {}
    }

    for (const module of modules) {
      const currentModule = this.publicProperties[module.$id]

      const actions: Record<string, any> = {}

      for (const action of currentModule.actions) {
        const typedActon = action as keyof StoreDefinition<string, State, Getters, Actions>

        actions[`${module.$id}/${action}`] = module[typedActon]
      }

      Object.assign(
        globalVariable._actions,
        actions
      )
    }

    return globalVariable
  }

  private getNormalizedNamespacedStore (params: GetNormalizedNamespaced) {
    const { key, payload } = params

    const object: Record<string, unknown> = {}

    for (const stateKey in payload) {
      const typedKey = stateKey as keyof (State | Getters | Actions)
      const state = payload[typedKey]

      object[`${key}/${typedKey}`] = state
    }

    return object
  }
}


// type Callback = () => Callback

// type Test = State & Actions & Callback


// const a: StoreDefinition<string, State, Getters, Actions> = {
//   $id: 
// }