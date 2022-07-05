// import { StoreModule } from 'types'

export default function registerModule (module: any) {
  console.log("🚀 ~ file: register-module.ts ~ line 4 ~ module", module)
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {

    // descriptor.get(value)
    console.log("🚀 ~ file: register-module.ts ~ line 9 ~ descriptor", descriptor)
    console.log("🚀 ~ file: register-module.ts ~ line 9 ~ key", key)
    console.log("🚀 ~ file: register-module.ts ~ line 9 ~ target", target)
  }
}
