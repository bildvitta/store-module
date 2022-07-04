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
      const { data } = response

      const state = getState.call(this, { isPinia, resource })

      if (data) {
        state.list.push(data)
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
