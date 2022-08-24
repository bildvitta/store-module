import {
  ActionsFnParams,
  NamespacedState,
  ActionsFnHandlerTuple,
  CreateActionPayload,
  CreateApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'
import { getStateFromAction, getActionPayload } from '@bildvitta/store-adapter'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<CreateActionPayload>
  ): Promise<AxiosResponse<CreateApiResponse>> {
    const {
      apiService,
      isPinia,
      options,
      resource
    } = configParams

    const {
      payload,
      url
    } = getActionPayload(isPinia, ...args) as CreateActionPayload

    const normalizedURL = url || options.createURL || `/${resource}/`

    try {
      const response = await apiService.post(normalizedURL, payload)
      const { result } = response.data

      const state = getStateFromAction.call(this, { isPinia, resource }) as State
      const hasResult: boolean = !!Object.keys(result || {}).length

      if (hasResult) {
        state.list.push(result)
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
