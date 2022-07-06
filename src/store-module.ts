import {
  // ApiService,
  ActionsFnParams,
  ApiService,
  Getters,
  ModuleOptions,
  State,
  StoreModule,
  StoreModuleOptions,
  ExternalActions
} from 'types'

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
  private apiService: ApiService
  private actions: ExternalActions
  private getters: Getters
  private idKey: string = 'uuid'
  private isPinia: boolean
  private isVuex: boolean
  // private perPage: number
  private state: State

  constructor (private options: StoreModuleOptions) {
    this.apiService = this.options.apiService

    if (!this.apiService) {
      throw new Error('Please, provide an "apiService"')
    }

    this.actions = this.options.actions || {}
    this.getters = this.options.getters || {}
    this.state = this.options.state || {}

    this.idKey = this.options.idKey
    // this.perPage = _this.options.perPage

    this.isPinia = (this.options.adapter || 'pinia') === 'pinia'
    this.isVuex = !this.isPinia
  }

  public getStoreModule (resource: string, options: ModuleOptions): StoreModule {
    const actionsPayload: ActionsFnParams = {
      apiService: this.apiService,
      idKey: this.idKey,
      isPinia: this.isPinia,
      options,
      resource
    }

    const idKey = options.idKey || this.idKey

    const store: StoreModule = {
      ...(this.isVuex && { namespaced: true }),

      state: () => {
        return {
          ...state(),
          ...this.state
        }
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
        create: create(actionsPayload),
        ...this.actions
      }
    }

    return store
  }
}
