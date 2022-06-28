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

import { state, getters, destroy, fetchList } from './module'

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

    // const test = await destroy(actionsPayload)

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
        fetchList: fetchList(actionsPayload)
      }
    }
  }

  // get options (): StoreModuleOptions {
  //   return this.options
  // }
}
