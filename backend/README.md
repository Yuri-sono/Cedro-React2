# Backend Cedro - SQL Server

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar SQL Server
- Instale o SQL Server (Express ou Developer)
- Configure um usuário `sa` com senha

### 3. Configurar variáveis de ambiente
Copie `.env.example` para `.env` e configure:
```
DB_USER=sa
DB_PASSWORD=sua_senha_aqui
DB_SERVER=localhost
DB_NAME=CEDRO_banco
JWT_SECRET=seu_jwt_secret_muito_seguro
PORT=3001
```

### 4. Inicializar banco de dados
```bash
npm run init-db
```

### 5. Executar servidor
```bash
npm start
```

## Estrutura do Banco

O banco possui as seguintes tabelas principais:
- `usuarios` - Usuários do sistema (pacientes e terapeutas)
- `terapeutas` - Dados específicos dos terapeutas
- `sessoes` - Sessões de terapia
- `avaliacoes` - Avaliações das sessões
- `pagamentos` - Controle de pagamentos
- `mensagens` - Sistema de mensagens
- `artigos` - Artigos e conteúdo
- `tags` - Tags para categorização

## Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login

### Terapeutas
- `GET /api/terapeutas` - Listar terapeutas

### Sessões
- `GET /api/sessoes` - Listar sessões