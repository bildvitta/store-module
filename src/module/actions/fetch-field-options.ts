import {
  ActionsFnParams,
  ActionsFnHandlerTuple,
  FetchFieldOptionsActionPayload,
  FetchFieldOptionsApiResponse
} from 'types'

import { AxiosResponse } from 'axios'
import { getActionPayload } from '../../utils'

export default function test (configParams: ActionsFnParams) {
  return function (
    ...args: ActionsFnHandlerTuple<FetchFieldOptionsActionPayload>
  ): Promise<AxiosResponse<FetchFieldOptionsApiResponse>> {
    const {
      apiService,
      isPinia,
      options,
      resource
    } = configParams

    const {
      params,
      url,
      field
    } = getActionPayload(isPinia, ...args) as FetchFieldOptionsActionPayload

    const normalizedURL = url || options.fetchFieldOptionsURL || `/${resource}/options/${field}`

    return apiService.get(normalizedURL, { params })
  }
}
