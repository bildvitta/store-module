import { FetchListAction, ActionsFnParams, NamespacedState, State } from '../../types'
import { getState } from '../../utils'
import { ActionContext } from 'vuex'

type Tuple = [ActionContext<State, any>, FetchListAction]

export default (configParams: ActionsFnParams) => {
  return async function (this: NamespacedState, ...args: Tuple) {
    /**
     * quando estamos trabalhando com o "vuex", o primeiro parâmetro sempre vai ser o "ActionContext",
     * porém quando trabalhamos com o "pinia", o primeiro parâmetro já é parâmetro real da action,
     * desta forma, sempre pegamos o args[1] como sendo nosso parâmetro real, e ignoramos no caso do vuex o ActionContext
     *
     * @link ActionContext: https://github.com/vuejs/vuex/blob/01f87f0c3d59d0796a2535719dfa8328d1af390d/types/index.d.ts#L62-L69
     */
    const payload = args[1]

    const { apiService, isPinia, options, resource, perPage } = configParams

    const { filters, increment, limit, ordering, page, search, url } = payload || {}

    const defaultPerPage = perPage || 12

    const params = {
      ...filters,
      limit: limit || defaultPerPage,
      offset: (page - 1) * (limit || defaultPerPage),
      ordering: ordering?.length ? ordering.join(',') : null,
      search
    }

    const normalizedURL = url || options.fetchListURL || `/${resource}/`

    try {
      const response = await apiService.get(normalizedURL, { params })
      const { results, count } = response.data

      const state = getState.call(this, {
        isPinia,
        resource
      })

      increment && page > 1
        ? state.list.push(...results)
        : state.list = results || []

      state.totalPages = Math.ceil(count / defaultPerPage)

      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
