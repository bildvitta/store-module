import { NamespacedState, State } from './index'

export interface StateParams {
  isPinia: boolean
  resource: keyof NamespacedState
}

export interface StateParamsByKey extends StateParams {
  key: keyof State & keyof NamespacedState
}

export interface SetStateParams extends StateParamsByKey {
  value: any
}
