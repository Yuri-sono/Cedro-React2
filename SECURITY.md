# Segurança - Cedro

## ⚠️ IMPORTANTE - Configuração de Segurança

### 1. Arquivo .env
- **NUNCA** commite o arquivo `.env` com dados reais
- Use o arquivo `.env.example` como modelo
- Configure suas próprias credenciais no `.env`

### 2. Vulnerabilidades Conhecidas
- Existem vulnerabilidades moderadas nas dependências
- Para corrigir (pode quebrar compatibilidade):
  ```bash
  npm audit fix --force
  ```

### 3. Configurações Recomendadas

#### Backend (.env)
```env
DB_USER=seu_usuario_seguro
DB_PASSWORD=senha_muito_forte_aqui
DB_SERVER=seu_servidor.com
DB_NAME=nome_do_banco
DB_PORT=1433
JWT_SECRET=chave_jwt_super_secreta_com_pelo_menos_32_caracteres
PORT=3001
```

#### Produção
- Use HTTPS sempre
- Configure CORS adequadamente
- Use variáveis de ambiente do servidor
- Monitore logs de segurança

### 4. Checklist de Segurança
- [ ] .env não está no repositório
- [ ] JWT_SECRET é forte (32+ caracteres)
- [ ] Senhas do banco são fortes
- [ ] CORS configurado corretamente
- [ ] Dependências atualizadas
- [ ] HTTPS configurado em produção