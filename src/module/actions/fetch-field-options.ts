import {
  ActionsFnParams,
  NamespacedState,
  ActionsFnHandlerTuple,
  FetchFieldOptionsActionPayload
} from '../../types'

import { AxiosResponse } from 'axios'

import { getActionPayload } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<FetchFieldOptionsActionPayload>
  ): Promise<AxiosResponse> {
    const { apiService, isPinia, options, resource } = configParams

    const payload = getActionPayload(isPinia, ...args) as FetchFieldOptionsActionPayload

    const { params, url, field } = payload || {}

    const normalizedURL = url || options.fetchFieldOptionsURL || `/${resource}/options/${field}`

    try {
      const response = await apiService.get(normalizedURL, { params })

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
