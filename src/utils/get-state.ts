import {
  NamespacedState,
  StateParams,
  State
} from 'types'

/**
 * @example setState.call(this, { isPinia: true })
 * @example setStateByKey.call(this, { isPinia: false, resource: 'users' })
 */
export default function (this: NamespacedState, params: StateParams): State {
  const { isPinia, resource } = params

  // resource

  // this

  return (isPinia ? this : this.state?.[resource]) as State
}
