import { DestroyAction, ActionsFnParams, NamespacedState } from '../../types'
import { run, getState } from '../../utils'

type Item = {
  [key: string]: any
}

export default (destroyConfig: ActionsFnParams) => {
  return async function (this: NamespacedState, payload: DestroyAction) {

    const { apiService, isPinia, options, resource, idKey } = destroyConfig
    const { id, params, url } = payload

    const normalizedURL = (
      run(url || options.destroyURL, { id }) ||
      `/${resource}/${id}/`
    )

    try {
      const response = await apiService.delete(normalizedURL, { params })

      const state = getState.call(this, {
        isPinia,
        resource
      })

      const index = state.list.findIndex((item: Item) => item[idKey] === id)

      if (~index) {
        state.list.splice(index, 1)
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
