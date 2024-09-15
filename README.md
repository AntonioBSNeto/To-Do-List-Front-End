# React + TypeScript + Vite

## Objetivo

O objetivo deste projeto é avaliar o código e design quanto à funcionalidade, usabilidade e aderência aos requisitos estabelecidos.

## Funcionabilidade

1. Tela de Cadastro de Tarefa
2. Tela de Edição de Tarefa
3. Tela de Listagem de Tarefas
4. Tela de Cadastro de Membro
5. Tela Home
6. Tela de Login
7. Tela excluir Membro
8. Tela excluir Tarefa


## API

A API está dispónivel aqiu no [github](https://github.com/AntonioBSNeto/To-Do-List-Back-End).

## Instalação

```bash
$ pnpm install
$ pnpm run dev
```


## Páginas
- **/**: Página de login.
- **/signup**: Página para cadastro de usuário.
- **/tarefas:** Página inicial com todas as tarefas.
- **/tarefas/adicionar:** Página para cadastro de tarefas.
- **/tarefas/editar/:tarefaId:** Página para atualizaçao ou remoção de tarefas.
- **/membros:** Página inicial com todas as membros.
- **/membros/editar/:membroId:** Página para atualizaçao ou remoção de membros.

## Mais informações

O vite por padrão inicializa a aplicação na porta 5173, caso não seja inicializado nessa porta, ocorrerá um problema devido ao CORS, e não conseguirá usar a API mencionada anteriormente.

