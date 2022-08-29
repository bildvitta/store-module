# StoreModule
`StoreModule` é uma biblioteca para gerar *stores* genéricas de C.R.U.D. É compatível com [Pinia](https://pinia.vuejs.org/) e [Vuex](https://vuex.vuejs.org/), foi desenvolvida para substituir a antiga [VuexStoreModule](https://github.com/bildvitta/vuex-store-module), que faz basicamente a mesma coisa com algumas mudanças porém só é compatível com o `Vuex`, uma vez que o `Pinia` é o gerenciador de estado de aplicação recomendado pela equipe do `Vue`.

> Esta biblioteca faz o uso do [StoreAdapter](https://github.com/bildvitta/store-adapter).

## 1. Instalando
```bash
npm i @bildvitta/store-module
```

## 2. Usando com Pinia
Para utilizar o StoreModule, você precisa inicializa-lo passando o adapter `pinia` e o apiService `axios`, exemplo:

Crie um arquivo chamado `store-module.js` contendo:
```js
import StoreModule from '@bildvitta/store-module'
import axios from 'axios'

const storeModule = new StoreModule({
  apiService: axios,
  adapter: 'pinia'
})

export default storeModule
```

Após a inicialização, vamos criar uma store de usuários contendo:

Vamos criar um arquivo `users.js` contendo:
```js
import storeModule from 'caminho-do-arquivo-store-module.js' // arquivo que inicializamos o StoreModule
import { defineStore } from 'pinia'

export default defineStore('users', storeModule.createStoreModule('users'))
```

Pronto, a store foi criada com sucesso! Agora vamos importar a store para ver como poderia utilizar ela.

```js
import usersStore from 'caminho-do-arquivo-users.js' // arquivo que criamos nossa store de usuários.

const user = usersStore()

console.log(user) // user tem acesso a toda nossa store, com states, getters e actions.
```

### 2.1. Usando com Pinia e Asteroid
Para utilizar esta biblioteca com Pinia e [Asteroid](https://github.com/bildvitta/asteroid), é necessário algumas configurações adicionais, uma vez que o asteroid faz o uso das stores através de variáveis globais, `$store` quando é vuex (que é injetada automaticamente pelo próprio vuex), e `$piniaStore` quando é pinia (que é injetado manualmente pelo `DefineGlobalPiniaStore`).

1. Instale a biblioteca `StoreAdapter`:
```bash
npm i @bildvitta/store-adapter
```

2. Crie um `boot` chamado `store-adapter` (ou algum outro nome de sua preferencia), importe este boot no `quasar.config.js`.

3. Importe o plugin `DefineGlobalPiniaStore` do `StoreAdapter` dentro do boot.

4. Após isto, importe **todas** as stores criadas na aplicação dentro deste boot e adicione elas ao plugin `DefineGlobalPiniaStore`.

Exemplo de como deveria ficar seu boot `store-adapter.js`:
```js
import { boot } from 'quasar/wrappers'
import { DefineGlobalPiniaStore } from '@bildvitta/store-adapter'
import users from 'caminho-do-arquivo-users.js'

export default boot(({ app }) => {
  app.use(DefineGlobalPiniaStore, {
    stores: {
      users
    }
  })
})
```

## 3. Usando com Vuex
1. Como a biblioteca da compatibilidade tanto para pinia quanto para vuex, não existem `mutations` dentro de nossas stores pois não existe mutations no pinia, por isto, **precisamos desativar o modo `strict`** do vuex, para isto, vá até a inicialização do vuex e desative passando `strict: false`, exemplo:

    ```js
    export default store(function (/* { ssrContext } */) {
      const Store = createStore({
        modules: {},

        strict: false // ----------------------Aqui desativamos o strict!!!----------------------
      })

      return Store
    })
    ```

    Caso você não desative o strict, vai disparar vários erros avisando que existem states sendo alterados fora de mutations.

    > Error: [vuex] Do not mutate vuex store state outside mutation handlers

2. Para utilizar o `StoreModule` com o vuex, você precisa inicializa-lo passando o adapter `vuex` e o apiService `axios`, exemplo:
Crie um arquivo chamado `store-module.js` contendo:

    ```js
    import StoreModule from '@bildvitta/store-module'
    import axios from 'axios'

    const storeModule = new StoreModule({
      apiService: axios,
      adapter: 'vuex'
    })

    export default storeModule
    ```

3. Após a inicialização, vamos criar uma store de usuários contendo:
Vamos criar um arquivo `users.js` contendo:

    ```js
    import storeModule from 'caminho-do-arquivo-store-module.js'

    export default storeModule.getStoreModule('users')
    ```

4. Após, isto vamos no arquivo onde foi inicializado o `Vuex`, vamos importar o `users.js` e adicionar ele dentro de `modules`, exemplo:
    ```js
    import users from 'caminho-do-users.js'

    export default store(function (/* { ssrContext } */) {
      const Store = createStore({
        modules: {
          users // ----------------------Aqui adicionamos o modulo users!!!----------------------
        },

        strict: false
      })

      return Store
    })
    ```

5. Pronto, a store foi criada com sucesso! Agora vamos importar a store para ver como poderia utilizar ela.
    ```js
    import usersStore from 'caminho-do-arquivo-users.js' // arquivo que criamos nossa store de usuários.

    import { mapActions, mapGetters, mapState } from 'vuex' // para utilizar o vuex é a forma convencional
    ```

### 3.1. Usando com Vuex e Asteroid
Para utilizar esta biblioteca com Vuex e [Asteroid](https://github.com/bildvitta/asteroid), **não** é necessário nenhuma configuração adicional.

## 4. Estrutura da *store* gerada
`state`
├── list
├── filters
└── totalPages
`getters`
└── byId
`actions`
├── create
├── destroy
├── fetchFieldOptions
├── fetchFilters
├── fetchList
├── fetchSingle
├── update
└── replace

## 5. Declaração de tipos
#### 5.1. State
```ts
export interface State {
  filters: ItemOfItem
  list: ItemOfItem[]
  totalPages: number
}
```

#### 5.2. Getters
```ts
export interface Getters {
  byId: (state: State) => (id: string | number) => Item | undefined
}
```

#### 5.3. Actions
```ts
export interface Actions {
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


## Roadmap
- [ ] Instalar eslint
- [ ] Testes unitários (vitest)
