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
} from "./types"

import {
  state,
  getters,
  // actions
  destroy,
  fetchList,
  fetchFilters,
  fetchSingle,
  fetchFieldOptions,
  update
} from './module'

export default class {
  // private adapter: 
  private apiService: ApiService
  private getters: Getters
  private idKey: string = 'uuid'
  private isPinia: boolean
  // private perPage: number
  private state: State

  constructor (private options: StoreModuleOptions) {
    this.apiService = options.apiService
    this.getters = options.getters
    this.idKey = options.idKey
    this.isPinia = (options.adapter?.name || 'pinia') === 'pinia'
    // this.perPage = _options.perPage
    this.state = options.state

    console.log(this.options)
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

    return {
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
        destroy: destroy(actionsPayload),
        fetchFieldOptions: fetchFieldOptions(actionsPayload),
        fetchFilters: fetchFilters(actionsPayload),
        fetchList: fetchList(actionsPayload),
        fetchSingle: fetchSingle(actionsPayload),
        update: update(actionsPayload)
      }
    }
  }

  // get options (): StoreModuleOptions {
  //   return this.options
  // }
}
