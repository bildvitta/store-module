import { NamespacedState, State, StateParams } from 'types'

/**
 * @example getState.call(this, { isPinia: true })
 * @example getState.call(this, { isPinia: false, resource: 'users' })
 */
export default function test (this: NamespacedState, params: StateParams): State {
  const { isPinia, resource } = params

  return (isPinia ? this : this.state?.[resource]) as State
}
