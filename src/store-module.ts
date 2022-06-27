import {
  // ApiService,
  // Getters,
  // State,
  ApiService,
  ModuleOptions,
  StoreModule,
  StoreModuleOptions,
  NamespacedState
} from "./types"

import { state, getters, destroy, fetchList } from './module'

export default class {
  // private adapter: 
  private apiService: ApiService
  // private getters: Getters
  // private idKey: string
  // private perPage: number
  // private state: State

  constructor (private options: StoreModuleOptions) {
    this.apiService = options.apiService
    // this.getters = _options.getters
    // this.idKey = _options.idKey
    // this.perPage = _options.perPage
    // this.state = _options.state

    console.log(this.options)
  }

  public getStoreModule (resource: keyof NamespacedState, options: ModuleOptions): StoreModule {
    return {
      namespaced: true,
      state: state(),
      getters: getters('uuid'),
      actions: {
        destroy: destroy({
          apiService: this.apiService,
          idKey: 'uuid', // TODO ALTERAR
          isPinia: false,
          options,
          resource
        }),
        fetchList: fetchList({
          apiService: this.apiService,
          idKey: 'uuid', // TODO ALTERAR
          isPinia: false,
          options,
          perPage: 12,
          resource
        })
      }
    }
  }

  // get options (): StoreModuleOptions {
  //   return this.options
  // }
}
