# Cedro - Apoio Psicológico

Plataforma de apoio psicológico desenvolvida com React e Vite.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Instalar dependências do frontend
npm install

# Instalar dependências do backend
cd backend
npm install

# Configurar variáveis de ambiente
cp backend/.env.example backend/.env
# Edite o arquivo .env com suas configurações

# Executar aplicação completa (frontend + backend)
npm run dev:full

# Ou executar separadamente:
# Frontend (porta 3000)
npm run dev

# Backend (porta 3001)
cd backend
npm start
```

### Scripts disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza a build de produção

## 🛠️ Tecnologias
- React 18
- Vite
- React Router DOM
- Bootstrap 5
- Bootstrap Icons

## 📁 Estrutura do projeto
```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React (Auth, etc)
├── pages/          # Páginas da aplicação
├── styles/         # Arquivos de estilo
├── App.jsx         # Componente principal
└── main.jsx        # Ponto de entrada

backend/
├── routes/         # Rotas da API
├── .env.example    # Exemplo de configuração
├── db.js           # Conexão com banco
└── index.js        # Servidor Express
```

## 🔒 Segurança

**IMPORTANTE:** Antes de usar em produção, leia o arquivo [SECURITY.md](SECURITY.md)

- Configure o arquivo `.env` com suas próprias credenciais
- Use senhas fortes para o banco de dados
- Configure HTTPS em produção
- Mantenha as dependências atualizadas