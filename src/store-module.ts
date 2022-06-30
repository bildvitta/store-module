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
  StoreModuleAdapter
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

    console.log('fui chamado no get')

    const idKey = options.idKey || this.idKey

    this.modules[resource] = {
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
        update: update(actionsPayload),
        replace: replace(actionsPayload),
        create: create(actionsPayload)
      }
    }

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
        update: update(actionsPayload),
        replace: replace(actionsPayload),
        create: create(actionsPayload)
      }
    }
  }

  public getGlocalStoreVariable () {
    const myObject: GlobalStoreVariable = {
      state: {},
      getters: {},
      dispatch: () => {},
      _actions: {}
    }

    for (const key in this.modules) {
      const module = this.modules[key]
      
      for (const stateKey in module.state) {
        const typedKey = stateKey as keyof State
        const state = module.state[typedKey]

        myObject.state[`${key}/${typedKey}`] = state
      }
    }

    console.log(myObject, 'getGlocalStoreVariable')
  }

  // private getGlocalStoreVariableTest () {

  // }
}

type GlobalStoreVariableState<T extends string> = {
  [key in `${T}/list`]: State['list']
}

const users = 'users'

const test: GlobalStoreVariableState<typeof users> = {
  // "users/list": [{}]
}

const test2: GlobalStoreVariableState = {
  
  // 'state/filters': ''
}

interface GlobalStoreVariable {
  state: State
  [key: string]: any
}
