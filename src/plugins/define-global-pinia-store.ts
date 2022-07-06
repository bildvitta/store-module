import { PiniaStoreDefinition, DefineGlobalPiniaStoreOptions } from 'types'
import { App } from 'vue'

export default {
  install: (app: App, options: DefineGlobalPiniaStoreOptions) => {
    const piniaStore: Record<string, PiniaStoreDefinition> = {}

    for (const store of options.stores) {
      piniaStore[store.$id] = store
    }

    app.config.globalProperties.$piniaStore = piniaStore
  }
}
