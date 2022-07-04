import {
  ActionsFnHandlerTuple,
  ActionsFnParams,
  DestroyActionPayload,
  NamespacedState,
  DestroyApiResponse,
  Item
} from 'types'

import { AxiosResponse } from 'axios'

import { run, getState, getActionPayload } from '../../utils'

export default (destroyConfig: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<DestroyActionPayload>
  ): Promise<AxiosResponse<DestroyApiResponse>> {
    const {
      apiService,
      isPinia,
      options,
      resource,
      idKey
    } = destroyConfig

    const {
      id,
      params,
      url
    } = getActionPayload(isPinia, ...args) as DestroyActionPayload

    const customURL = run(url || options.destroyURL, { id })
    const normalizedURL = customURL || `/${resource}/${id}/`

    try {
      const response = await apiService.delete(normalizedURL, { params })

      const state = getState.call(this, { isPinia, resource })

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
