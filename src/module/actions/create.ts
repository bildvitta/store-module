import {
  ActionsFnParams,
  NamespacedState,
  ActionsFnHandlerTuple,
  CreateActionPayload,
  CreateApiResponse
} from 'types'

import { AxiosResponse } from 'axios'

import { getState, getActionPayload } from '../../utils'

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

      const state = getState.call(this, { isPinia, resource })
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
