type CallbackFn = (...url: unknown[]) => string

export default (fn: CallbackFn | string, ...parameters: unknown[]) => {
  return typeof fn === 'function' ? fn(...parameters) : fn
}
