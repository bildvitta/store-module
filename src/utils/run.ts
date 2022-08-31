import { RunCallbackFn } from 'types'

export default (fn: RunCallbackFn | string | undefined, ...parameters: unknown[]) => {
  return typeof fn === 'function' ? fn(...parameters) : fn
}
