import {
  ActionsFnParams,
  NamespacedState,
  ActionsFnHandlerTuple,
  FetchFiltersActionPayload,
  FetchFiltersApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'
import { getStateFromAction, getActionPayload } from '@bildvitta/store-adapter'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<FetchFiltersActionPayload>
  ): Promise<AxiosResponse<FetchFiltersApiResponse>> {
    const {
      apiService,
      isPinia,
      options,
      resource
    } = configParams

    const {
      params,
      url
    } = getActionPayload(isPinia, ...args) as FetchFiltersActionPayload

    const normalizedURL = url || options.fetchFiltersURL || `/${resource}/filters/`

    try {
      const response = await apiService.get(normalizedURL, { params })
      const { fields } = response.data

      const state = getStateFromAction.call(this, { isPinia, resource }) as State
      console.log("🚀 ~ file: fetch-filters.ts ~ line 37 ~ this", this)
      console.log("🚀 ~ file: fetch-filters.ts ~ line 37 ~ state", state, { isPinia, resource })

      state.filters = fields

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
