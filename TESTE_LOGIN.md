# 🧪 Como Testar o Sistema de Login

## ✅ Funcionalidades Implementadas

### 📝 Cadastro Completo
- ✅ Campos obrigatórios: nome, email, senha, data nascimento, gênero, telefone, tipo usuário
- ✅ Hash de senhas com bcrypt
- ✅ Validação no backend
- ✅ Mensagens de erro/sucesso

### 🔐 Login Funcional
- ✅ Login de pacientes (`/login`)
- ✅ Login de terapeutas (`/login-terapeuta`)
- ✅ JWT com expiração 24h
- ✅ Redirecionamento automático

### 🌳 Árvore de Sequência
- ✅ Fuso horário do Brasil (America/Sao_Paulo)
- ✅ Contagem de dias consecutivos
- ✅ Animações de crescimento
- ✅ Notificações de progresso
- ✅ Aparece apenas para usuários logados
- ✅ 6 estágios de crescimento

## 🚀 Como Testar

### 1. Iniciar Backend
```bash
cd backend
npm start
```

### 2. Iniciar Frontend
```bash
npm run dev
```

### 3. Testar Cadastro
1. Vá para `/login`
2. Clique em "Não tem conta? Cadastre-se"
3. Preencha todos os campos
4. Escolha tipo: paciente ou terapeuta
5. Clique em "Cadastrar"

### 4. Testar Login Paciente
1. Vá para `/login`
2. Use email/senha cadastrados
3. Deve redirecionar para home
4. Navbar mostra nome do usuário
5. Árvore aparece no canto inferior direito

### 5. Testar Login Terapeuta
1. Vá para `/login-terapeuta`
2. Use email/senha de usuário tipo "terapeuta"
3. Deve redirecionar para `/terapeuta/dashboard`
4. Acesso às rotas de terapeuta liberado

### 6. Testar Árvore de Sequência
1. Faça login
2. Veja a árvore no canto inferior direito
3. Clique na árvore para ver detalhes
4. Volte no dia seguinte para ver crescimento
5. Para testar: limpe localStorage e recarregue

### 7. Testar Logout
1. Clique no nome do usuário na navbar
2. Clique em "Sair"
3. Deve voltar para estado não logado
4. Árvore desaparece

## 🐛 Possíveis Problemas

### Backend não conecta
- Verifique se SQL Server está rodando
- Configure `.env` com credenciais corretas
- Execute schema do banco

### Cadastro falha
- Verifique se tabela `usuarios` existe
- Campos obrigatórios preenchidos
- Email único no banco

### Árvore não aparece
- Usuário deve estar logado
- Verifique console para erros
- localStorage deve ter dados de streak

## 📊 Estágios da Árvore
- 🌱 Semente (1-2 dias)
- 🌱 Broto (3-6 dias)  
- 🌱 Broto Forte (7-13 dias)
- 🌿 Árvore Jovem (14-20 dias)
- 🌲 Árvore Adulta (21-29 dias)
- 🌳 Árvore Frondosa (30+ dias)