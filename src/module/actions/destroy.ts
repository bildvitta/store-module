import { Destroy, ModuleOptions, State } from '../../types'
import { run } from '../../utils'

// interface Pinia extends State

export default (isPinia: boolean, resource: string, options: ModuleOptions) => {
  return function (this: State, payload: Destroy) {
    const { id, params, url } = payload

    const normalizedURL = (
      run(url || options.destroyURL, { id }) ||
      `/${resource}/${id}/`
    )

    console.log(this, normalizedURL, isPinia, params)
  }
}
