import {
  ActionsFnParams,
  ApiService,
  ExternalGetters,
  ModuleOptions,
  ExternalState,
  StoreModule,
  StoreModuleOptions,
  ExternalActions
} from 'types'

import {
  state,
  getters,
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
  private getters: ExternalGetters
  private idKey: string = 'uuid'
  private isPinia: boolean
  private isVuex: boolean
  // private perPage: number
  private state: ExternalState

  constructor (private options: StoreModuleOptions) {
    this.apiService = this.options.apiService

    if (!this.apiService) {
      throw new Error('Please, provide the "apiService"')
    }

    this.actions = this.options.actions || {}
    this.getters = this.options.getters || {}
    this.state = this.options.state || {}

    this.idKey = this.options.idKey

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
        create: create(actionsPayload),
        destroy: destroy(actionsPayload),
        fetchFieldOptions: fetchFieldOptions(actionsPayload),
        fetchFilters: fetchFilters(actionsPayload),
        fetchList: fetchList(actionsPayload),
        fetchSingle: fetchSingle(actionsPayload),
        replace: replace(actionsPayload),
        update: update(actionsPayload),

        ...this.actions
      }
    }

    return store
  }
}
