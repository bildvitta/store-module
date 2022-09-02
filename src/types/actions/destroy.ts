import { ApiResponse } from 'types'

export interface DestroyActionPayload {
  id: string | number
  params: Record<string, unknown>
  url: string
}

export type DestroyURL = Pick<DestroyActionPayload, 'id'>

export type DestroyApiResponse = Pick<ApiResponse, 'result' | 'status'>
