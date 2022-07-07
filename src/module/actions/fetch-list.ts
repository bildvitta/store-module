import {
  ActionsFnParams,
  NamespacedState,
  ActionsFnHandlerTuple,
  FetchListActionPayload,
  FetchListApiResponse
} from 'types'

import { AxiosResponse } from 'axios'

import { getState, getActionPayload } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<FetchListActionPayload>
  ): Promise<AxiosResponse<FetchListApiResponse>> {
    const { apiService, isPinia, options, resource, perPage } = configParams

    const {
      filters,
      increment,
      limit,
      ordering,
      page,
      search,
      url
    } = getActionPayload(isPinia, ...args) as FetchListActionPayload

    const defaultPerPage = perPage || 12
    
    const params = {
      ...filters,
      limit: limit || defaultPerPage,
      offset: ((page || 1) - 1) * (limit || defaultPerPage),
      ordering: ordering?.length ? ordering.join(',') : null,
      search
    }

    const normalizedURL = url || options.fetchListURL || `/${resource}/`

    try {
      const response = await apiService.get(normalizedURL, { params })
      console.log("🚀 ~ file: fetch-list.ts ~ line 44 ~ response", response)
      const { results, count } = response.data

      const state = getState.call(this, { isPinia, resource })

      console.log({ isPinia, resource }, '>>>> results')

      increment && page > 1
        ? state.list.push(...results)
        : state.list = results || []

      state.totalPages = Math.ceil(count / defaultPerPage)

      console.log(state, '>>>>> state')

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
