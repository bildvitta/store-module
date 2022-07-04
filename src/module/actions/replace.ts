import {
  ActionsFnHandlerTuple,
  ActionsFnParams,
  Item,
  NamespacedState,
  ReplaceActionPayload,
  ReplaceApiResponse
} from 'types'

import { AxiosResponse } from 'axios'

import { getState, getActionPayload, run } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<ReplaceActionPayload>
  ): Promise<AxiosResponse<ReplaceApiResponse>> {
    const { apiService, isPinia, options, resource, idKey } = configParams

    const { id, payload, url } = getActionPayload(isPinia, ...args) as ReplaceActionPayload

    const customURL = run(url || options.replaceURL, { id })
    const normalizedURL = customURL || `/${resource}/${id}/`

    try {
      const response = await apiService.put(normalizedURL, payload)
      const { result } = response.data

      const state = getState.call(this, {
        isPinia,
        resource
      })

      const index = state.list.findIndex(
        (item: Item) => item[idKey] === result[idKey]
      )

      if (~index) {
        state.list.splice(index, 1, result)
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
