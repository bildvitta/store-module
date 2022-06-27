import { Destroy, ModuleOptions, NamespacedState } from '../../types'
import { run } from '../../utils'

export default (isPinia: boolean, resource: string, options: ModuleOptions) => {
  return function (this: NamespacedState, payload: Destroy) {
    const { id, params, url } = payload

    // console.log(this.state)

    const normalizedURL = (
      run(url || options.destroyURL, { id }) ||
      `/${resource}/${id}/`
    )

    console.log(this, normalizedURL, isPinia, params)
  }
}
