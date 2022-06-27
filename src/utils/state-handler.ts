import { NamespacedState, State } from '../types'

interface StateParams {
  resource: keyof NamespacedState
  key: keyof State & keyof NamespacedState
}

interface SetStateParams extends StateParams {
  value: any
}

export function setState (this: NamespacedState, isPinia: boolean, params: SetStateParams): void {
  const { key, value, resource } = params

  if (isPinia) {
    this[key] = value

    return
  }

  if (this.state?.[resource]) {
    this.state[resource][key] = value
  }
}

export function getState (this: NamespacedState, isPinia: boolean, params: StateParams) {
  const { key, resource } = params

  return isPinia ? this[key] : this.state?.[resource][key]
}
