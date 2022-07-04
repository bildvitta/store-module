import {
  SetStateParams,
  NamespacedState,
  StateParams,
  StateParamsByKey,
  State
} from 'types'

/**
 * @example setStateByKey.call(this, { isPinia: true, key: 'list', value: [] })
 * @example setStateByKey.call(this, { isPinia: false, key: 'list', value: [], resource: 'users' })
 */
export function setStateByKey (this: NamespacedState, params: SetStateParams): void {
  const { isPinia, key, value, resource } = params

  if (isPinia) {
    this[key] = value

    return
  }

  if (this.state?.[resource]) {
    this.state[resource][key] = value
  }
}

/**
 * @example setStateByKey.call(this, { isPinia: true, key: 'list' })
 * @example setStateByKey.call(this, { isPinia: false, key: 'list', resource: 'users' })
 */
export function getStateByKey (this: NamespacedState, params: StateParamsByKey) {
  const { isPinia, key, resource } = params

  return isPinia ? this[key] : this.state?.[resource][key]
}

/**
 * @example setState.call(this, { isPinia: true })
 * @example setStateByKey.call(this, { isPinia: false, resource: 'users' })
 */
export function getState (this: NamespacedState, params: StateParams): State {
  const { isPinia, resource } = params

  return (isPinia ? this : this.state?.[resource]) as State
}
