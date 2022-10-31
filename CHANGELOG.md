# Changelog
Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Para encontrar de uma forma mais detalhada todas as mudanças da `versão 2` para a `versão 3`, navegue até o arquivo `/docs/src/pages/start/upgrade-guide.md`.
Neste arquivo (CHANGELOG.MD) você encontrará somente as mudanças referentes a versão 3.

### Sobre os "BREAKING CHANGES"
Podemos ter pequenas breaking changes sem alterar o `major` version, apesar de serem pequenas, podem alterar o comportamento da funcionalidade caso não seja feita uma atualização, **preste muita atenção** nas breaking changes dentro das versões quando existirem.

## Não publicado
### Adicionado
- Adicionado `CHANGELOG.md`.

### Corrigido
- Corrigido interface `StoreModuleOptions` e `ModuleOptions` onde os actions/state/getters era enviado para a instancia da classe ao invés do método `createStoreModule`.
- Corrigido documentação do `README.md` onde o método era `getStoreModule` ao invés de `createStoreModule`.
