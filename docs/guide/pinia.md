---
title: Usando com pinia
editLink: true
---

# Usando com pinia

Para utilizar o `StoreModule`, você precisa ter instalado o [pinia](https://pinia.vuejs.org/getting-started.html) e o [axios](https://axios-http.com/ptbr/docs/intro), ou alguma outra biblioteca com API semelhante.

#### Você pode criar um arquivo chamado `store-module.js`, dentro dele adicione:

```js
import axios from 'axios'
import StoreModule from '@bildvitta/store-module'

const storeModule = new StoreModule({
  adaptader: 'pinia', // "pinia" já é o default, não precisa passar caso deseje
  apiService: axios
})

export default storeModule
```

#### Agora para criar uma store de usuários por exemplo:

```js
import storeModule from 'caminho-de-onde-declarou-o-store-module.js'
import { defineStore } from 'pinia'

const id = 'users'

export default defineStore(id, storeModule.getStoreModule(id))
```

#### Usando store de usuários:

```js
import useUsersStore from 'caminho-onde-declarou-users.js'

const usersStore = useUsersStore()

usersStore.list // retorna lista de usuários
usersStore.filters // retorna filtro de usuários
usersStore.totalPage // retorna paginação de usuários
usersStore.byId('id-do-meu-usuario') // retorna meu usuário
usersStore.create // retorna actions para criar usuário
usersStore.update // retorna actions para atualizar usuário
usersStore.replace // retorna actions para atualizar usuário
usersStore.destroy // retorna actions para deletar usuário
usersStore.fetchList // retorna actions para recuperar usuários
usersStore.fetchSingle // retorna actions para recuperar um usuário
usersStore.fetchFilters // retorna actions para recuperar filtros de usuários
usersStore.fetchFieldOptions // retorna actions para opções de um campo de usuários
```

Caso esteja usando plugin `defineGlobalPiniaStore`:
::: warning
Esta forma de recuperar a store **não** é a mais recomenda, utilize apenas em casos de **import** de store com **path** dinâmico.
:::

```js
this.$piniaStore.users // retorna toda store de usuários
```

:::tip
Existem outras formas de recuperar a store do pinia, para saber mais clique [aqui](https://pinia.vuejs.org/getting-started.html).
:::