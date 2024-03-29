import {
  ActionsFnHandlerTuple,
  ActionsFnParams,
  Item,
  NamespacedState,
  UpdateActionPayload,
  UpdateApiResponse,
  State
} from 'types'

import { AxiosResponse } from 'axios'

import { run } from '../../utils'
import { getStateFromAction, getActionPayload } from '@bildvitta/store-adapter'

export default (configParams: ActionsFnParams) => {
  return async function (
    this: NamespacedState,
    ...args: ActionsFnHandlerTuple<UpdateActionPayload>
  ): Promise<AxiosResponse<UpdateApiResponse>> {
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
    } = getActionPayload(isPinia, ...args) as UpdateActionPayload

    const customURL = run(url || options.updateURL, { id })
    const normalizedURL = customURL || `/${resource}/${id}/`

    try {
      const response = await apiService.patch(normalizedURL, payload)
      const { result } = response.data

      const state = getStateFromAction.call(this, { isPinia, resource }) as State

      for (const index in state.list) {
        const item: Item = state.list[index]

        if (item[idKey] === result[idKey]) {
          state.list.splice(+index, 1, { ...item, ...result })
          break
        }
      }

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
