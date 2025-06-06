import {
  ActionsFnParams,
  NamespacedState,
  ActionsFnHandlerTuple,
  FetchListActionPayload,
  FetchListApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'
import { getStateFromAction, getActionPayload } from '@bildvitta/store-adapter'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<FetchListActionPayload>
  ): Promise<AxiosResponse<FetchListApiResponse>> {
    const { apiService, isPinia, options, resource } = configParams

    const {
      filters,
      increment,
      limit,
      ordering,
      page,
      search,
      url
    } = getActionPayload(isPinia, ...args) as FetchListActionPayload

    const defaultPerPage = options.perPage || 36

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
      const { results, count } = response.data

      const state = getStateFromAction.call(this, { isPinia, resource }) as State

      increment && page > 1
        ? state.list.push(...results)
        : state.list = results || []

      state.totalPages = Math.ceil(count / defaultPerPage)

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
