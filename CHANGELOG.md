# Changelog
Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Sobre os "BREAKING CHANGES"
Podemos ter pequenas breaking changes sem alterar o `major` version, apesar de serem pequenas, podem alterar o comportamento da funcionalidade caso não seja feita uma atualização, **preste muita atenção** nas breaking changes dentro das versões quando existirem.

## 1.1.0-beta.1 - 22-04-2025
### Corrigido
- Corrigido build correto [v1.1.0-beta.0].

## 1.1.0-beta.0 - 16-04-2025
### Modificado
- Modificado `perPage` para 36 itens por página.

### Corrigido
- Corrigido possibilidade de passar `perPage` através do `createStoreModule`.

## 1.0.0 - 03-02-2023
Versão estável lançada!

## 1.0.0-beta.11
### Adicionado
- Adicionado `CHANGELOG.md`.

### Corrigido
- Corrigido interface `StoreModuleOptions` e `ModuleOptions` onde os actions/state/getters era enviado para a instancia da classe ao invés do método `createStoreModule`.
- Corrigido documentação do `README.md` onde o método era `getStoreModule` ao invés de `createStoreModule`.
