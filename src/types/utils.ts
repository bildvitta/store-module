import { NamespacedState, State } from './index'

export interface StateParams {
  isPinia: boolean
  resource: string
}

export interface StateParamsByKey extends StateParams {
  key: keyof State & keyof NamespacedState
}

export interface SetStateParams extends StateParamsByKey {
  value: any
}
