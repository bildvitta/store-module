export interface StateParams {
  isPinia: boolean
  resource: string
}


export type RunCallbackFn = (...url: unknown[]) => string | undefined

export interface RunParams {
  payload: RunCallbackFn | string | undefined
  parameters: unknown[]
}
