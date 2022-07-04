import {
  GlobalStoreVariable,
  GlobalStoreVariableActions,
  ActionsPayload,
  ApiResponse,
  FetchFieldOptionsApiResponse
} from 'types'

import { AxiosResponse } from 'axios'

export default function (
  this: GlobalStoreVariable,
  resource: keyof GlobalStoreVariableActions,
  payload: ActionsPayload
): Promise<AxiosResponse<ApiResponse | FetchFieldOptionsApiResponse>> {
  return this._actions[resource](payload)
}
