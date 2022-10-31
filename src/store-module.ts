import {
  ActionsFnParams,
  AvailableAdapters,
  ModuleOptions,
  StoreModuleClass,
  StoreModuleOptions
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

export default class StoreModule {
  private isPinia: boolean
  private isVuex: boolean

  constructor (private options: StoreModuleOptions) {
    if (!this.options.apiService) {
      throw new Error('Please, provide the "apiService"')
    }

    const availableAdapters: AvailableAdapters = ['pinia', 'vuex']

    if (!availableAdapters.includes('pinia')) {
      throw new Error('Wrong adapter, available adapters are: "pinia"(default) or "vuex"')
    }

    this.isPinia = (this.options.adapter || 'pinia') === 'pinia'
    this.isVuex = !this.isPinia
  }

  public createStoreModule (resource: string, options: ModuleOptions): StoreModuleClass {
    options = options || {}

    const idKey = options?.idKey || this.options.idKey || 'uuid'

    const actions = options.actions || {}
    const gettersData = options.getters || {}
    const stateData = options.state || {}

    const actionsPayload: ActionsFnParams = {
      apiService: this.options.apiService,
      isPinia: this.isPinia,
      idKey,
      options,
      resource
    }

    const store: StoreModuleClass = {
      ...(this.isVuex && { namespaced: true }),

      state: () => {
        return {
          ...state(),

          ...stateData
        }
      },

      getters: {
        ...getters(idKey),

        ...gettersData
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

        ...actions
      }
    }

    return store
  }
}
