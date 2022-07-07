import { ActionsFnHandlerTuple, PayloadActionType } from 'types'

/**
 * quando estamos trabalhando com o "vuex", o primeiro parâmetro sempre vai ser o "ActionContext",
 * porém quando trabalhamos com o "pinia", o primeiro parâmetro já é parâmetro real da action,
 * desta forma, sempre pegamos o args[argIndex] como sendo nosso parâmetro real, e ignoramos no caso do vuex o ActionContext
 *
 * @link ActionContext: https://github.com/vuejs/vuex/blob/01f87f0c3d59d0796a2535719dfa8328d1af390d/types/index.d.ts#L62-L69
 */
export default (
  isPinia: boolean,
  ...args: ActionsFnHandlerTuple<PayloadActionType>
): PayloadActionType => {
  const argIndex: number = isPinia ? 0 : 1

  return (args[argIndex] || {}) as PayloadActionType
}
