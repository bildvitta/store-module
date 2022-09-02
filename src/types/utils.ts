export interface StateParams {
  isPinia: boolean
  resource: string
}

export type RunCallbackFn <T> = (url: T) => string | undefined

