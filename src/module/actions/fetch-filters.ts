import {
  ActionsFnParams,
  NamespacedState,
  ActionsFnHandlerTuple,
  FetchFiltersActionPayload,
  FetchFiltersApiResponse
} from 'types'

import { AxiosResponse } from 'axios'

import { getState, getActionPayload } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<FetchFiltersActionPayload>
  ): Promise<AxiosResponse<FetchFiltersApiResponse>> {
    const { apiService, isPinia, options, resource } = configParams

    const payload = getActionPayload(isPinia, ...args) as FetchFiltersActionPayload

    const { params, url } = payload || {}

    const normalizedURL = url || options.fetchFiltersURL || `/${resource}/filters/`

    try {
      const response = await apiService.get(normalizedURL, { params })
      const { fields } = response.data

      const state = getState.call(this, {
        isPinia,
        resource
      })

      state.filters = fields

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
