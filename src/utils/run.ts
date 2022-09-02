import { RunCallbackFn } from 'types'

export default <T> (fn: RunCallbackFn<T> | string | undefined, parameters: T) => {
  return typeof fn === 'function' ? fn(parameters) : fn
}
