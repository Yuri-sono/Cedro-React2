# TODO: Corrigir erro ao apagar conta

## Problema
O usuário está enfrentando erro "erro ao apagar conta" ao tentar excluir a conta no site. O problema é causado por restrições de integridade referencial no banco de dados - o usuário não pode ser deletado enquanto ainda há sessões e mensagens associadas a ele.

## Solução
Modificar o método `excluirConta` no `AuthService` para deletar primeiro as dependências (sessões e mensagens) antes de deletar o usuário.

## Passos
- [ ] Modificar `AuthService.excluirConta()` para deletar sessões e mensagens relacionadas antes de deletar o usuário
- [ ] Testar a funcionalidade de exclusão de conta
