import {
  // ApiService,
  // Getters,
  // State,
  StoreModuleOptions,
  StoreModule,
  ModuleOptions
} from "./types"

import { state, getters, destroy } from './module'

export default class {
  // private adapter: 
  // private apiService: ApiService
  // private getters: Getters
  // private idKey: string
  // private perPage: number
  // private state: State

  constructor (private options: StoreModuleOptions) {
    // this.apiService = _options.apiService
    // this.getters = _options.getters
    // this.idKey = _options.idKey
    // this.perPage = _options.perPage
    // this.state = _options.state

    console.log(this.options)
  }

  public getStoreModule (resource: string, options: ModuleOptions): StoreModule {
    return {
      namespaced: true,
      state: state(),
      getters: getters('uuid'),
      actions: {
        destroy: destroy(false, resource, options),

        test () {
          console.log(this)
        }
      }
    }
  }

  // get options (): StoreModuleOptions {
  //   return this.options
  // }
}
