# Hello World Angular 18

Este é um projeto Hello World criado com Angular 18 seguindo as melhores práticas de desenvolvimento.

## Tecnologias Utilizadas

- **Angular 18** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **Standalone Components** - Arquitetura moderna do Angular

## Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em modo desenvolvimento:
```bash
npm start
```

## Scripts disponíveis

- `npm start` - Executa o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm test` - Executa os testes unitários
- `npm run watch` - Build em modo watch para desenvolvimento

## Estrutura do projeto

- `src/app/` - Componentes da aplicação
- `src/app/app.component.html` - Template do componente principal
- `src/app/app.component.scss` - Estilos do componente principal
- `src/app/app.component.ts` - Lógica do componente principal
- `src/app/app.component.spec.ts` - Testes unitários do componente principal
- `src/styles.scss` - Estilos globais
- `karma.conf.js` - Configuração do Karma para testes
- `tsconfig.spec.json` - Configuração TypeScript para testes
- `angular.json` - Configuração do Angular CLI

## Testes Unitários

O projeto inclui testes unitários completos usando Jasmine e Karma:

- **Cobertura de testes**: Testa criação do componente, renderização do template, interações do usuário
- **Padrão AAA**: Arrange-Act-Assert para estrutura clara dos testes
- **Mocks e Spies**: Uso de spies para testar interações e métodos
- **Testes de integração**: Verificação da renderização correta do HTML

Para executar os testes:
```bash
npm test
```

## Melhores Práticas Implementadas

- **Separação de responsabilidades**: Template, estilos e lógica em arquivos separados
- **Standalone Components**: Uso da arquitetura moderna do Angular
- **TypeScript**: Tipagem forte e interfaces bem definidas
- **SCSS**: Pré-processador CSS para estilos organizados
- **Estrutura modular**: Código organizado e reutilizável
- **Testes unitários**: Cobertura completa com Jasmine e Karma
