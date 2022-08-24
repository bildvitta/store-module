import {
  ActionsFnHandlerTuple,
  ActionsFnParams,
  Item,
  NamespacedState,
  ReplaceActionPayload,
  ReplaceApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'

import { run } from '../../utils'
import { getStateFromAction, getActionPayload } from '@bildvitta/store-adapter'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<ReplaceActionPayload>
  ): Promise<AxiosResponse<ReplaceApiResponse>> {
    const {
      apiService,
      idKey,
      isPinia,
      options,
      resource
    } = configParams

    const {
      id,
      payload,
      url
    } = getActionPayload(isPinia, ...args) as ReplaceActionPayload

    const customURL = run(url || options.replaceURL, { id })
    const normalizedURL = customURL || `/${resource}/${id}/`

    try {
      const response = await apiService.put(normalizedURL, payload)
      const { result } = response.data

      const state = getStateFromAction.call(this, { isPinia, resource }) as State

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
