# Sistema de Login - Cedro

## ✅ Funcionalidades Implementadas

### Frontend
- ✅ Contexto de autenticação (AuthContext)
- ✅ Login para pacientes e terapeutas
- ✅ Proteção de rotas
- ✅ Navbar dinâmica baseada no status de login
- ✅ Logout funcional
- ✅ Estados de loading

### Backend
- ✅ Rotas de autenticação (/api/auth/login e /api/auth/register)
- ✅ Hash de senhas com bcrypt
- ✅ JWT para autenticação
- ✅ Validação de tipos de usuário

## 🚀 Como usar

### 1. Configurar Backend
```bash
cd backend
npm install
```

### 2. Configurar Banco de Dados
- Copie `.env.example` para `.env`
- Configure suas credenciais do SQL Server
- Execute o schema do banco (SQL Cedro/schema_completo.sql)

### 3. Iniciar Backend
```bash
cd backend
npm start
```

### 4. Iniciar Frontend
```bash
npm run dev
```

## 🔐 Como funciona

### Login de Paciente
1. Acesse `/login`
2. Use email e senha cadastrados
3. Após login, será redirecionado para a home
4. Navbar mostrará nome do usuário

### Login de Terapeuta
1. Acesse `/login-terapeuta`
2. Use email e senha de um usuário com tipo_usuario = 'terapeuta'
3. Após login, será redirecionado para `/terapeuta/dashboard`
4. Acesso às rotas de terapeuta será liberado

### Cadastro
1. Na tela de login, clique em "Não tem conta? Cadastre-se"
2. Preencha os dados incluindo tipo de usuário
3. Após cadastro, faça login normalmente

## 🛡️ Rotas Protegidas
- `/perfil` - Requer login
- `/terapeuta/*` - Requer login como terapeuta

## 🔧 Estrutura Técnica

### AuthContext
- Gerencia estado global de autenticação
- Persiste login no localStorage
- Fornece funções login/logout

### ProtectedRoute
- Componente que protege rotas
- Redireciona para login se não autenticado
- Valida tipo de usuário quando necessário

### Backend Auth
- Hash de senhas com bcrypt
- JWT com expiração de 24h
- Validação de credenciais no banco