---
title: Estrutura da store
---

# Estrutura padrão da store gerada

## State

```js
const state = () => {
  return {
    list: [],
    totalPage: 0,
    filters: {}
  }
}
```


##### Declaração do tipo
```ts
interface State {
  filters: ItemOfItem
  list: object[]
  totalPages: number
}
```

## Getters

```js
const getters = {
  byId: state => id => state.list.find((item: Item) => item[idKey] === id)
}
```

##### Declaração do tipo
```ts
interface Getters {
  byId: (state: State) => (id: string | number) => Item | undefined
}
```

## Actions

### fetchFielOptions

```js
function fetchFielOptions (
  ...args: ActionsFnHandlerTuple<FetchFieldOptionsActionPayload>
): Promise<AxiosResponse<FetchFieldOptionsApiResponse>> {
  const {
    apiService,
    isPinia,
    options,
    resource
  } = configParams

  const {
    params,
    url,
    field
  } = getActionPayload(isPinia, ...args) as FetchFieldOptionsActionPayload

  const normalizedURL = url || options.fetchFieldOptionsURL || `/${resource}/options/${field}`

  return apiService.get(normalizedURL, { params })
}
```

##### Declaração de tipos das Actions
```ts
interface Actions {
  destroy: (payload: DestroyActionPayload) => Promise<AxiosResponse<DestroyApiResponse>>
  fetchFieldOptions: (payload: FetchFieldOptionsActionPayload) => Promise<AxiosResponse<FetchFieldOptionsApiResponse>>
  fetchFilters: (payload: FetchFiltersActionPayload) => Promise<AxiosResponse<FetchFiltersApiResponse>>
  fetchList: (payload: FetchListActionPayload) => Promise<AxiosResponse<FetchListApiResponse>>
  fetchSingle: (payload: FetchSingleActionPayload) => Promise<AxiosResponse<FetchSingleApiResponse>>
  update: (payload: UpdateActionPayload) => Promise<AxiosResponse<UpdateApiResponse>>
  replace: (payload: ReplaceActionPayload) => Promise<AxiosResponse<ReplaceApiResponse>>
  create: (payload: CreateActionPayload) => Promise<AxiosResponse<CreateApiResponse>>
}
```
