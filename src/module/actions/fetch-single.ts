import {
  ActionsFnHandlerTuple,
  ActionsFnParams,
  FetchSingleActionPayload,
  FetchSingleApiResponse,
  Item,
  NamespacedState
} from 'types'

import { AxiosResponse } from 'axios'

import { getState, getActionPayload, run } from '../../utils'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<FetchSingleActionPayload>
  ): Promise<AxiosResponse<FetchSingleApiResponse>> {
    const {
      apiService,
      isPinia,
      options,
      resource,
      idKey
    } = configParams

    const {
      form,
      id,
      params,
      url
    } = getActionPayload(isPinia, ...args) as FetchSingleActionPayload

    const customURL = run(url || options.fetchSingleURL, { form, id })
    const automaticURL = form
      ? `/${resource}/${id ? `${id}/edit`
      : 'new'}/` : `/${resource}/${id}/`

    const normalizedURL = customURL || automaticURL

    try {
      const response = await apiService.get(normalizedURL, { params })
      const { result } = response.data

      const state = getState.call(this, { isPinia, resource })

      if (result) {
        const index = state.list.findIndex(
          (item: Item) => item[idKey] === result[idKey]
        )

        if (~index) {
          state.list.splice(index, 1, result)
        } else {
          state.list.push(result)
        }
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
