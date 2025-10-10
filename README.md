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

# Configurar variáveis de ambiente do Spring Boot
cp backend/cedro-backend/.env.example backend/cedro-backend/.env
# Edite o arquivo .env com suas configurações

# Executar frontend (porta 3000)
npm run dev

# Executar backend Spring Boot (porta 3001)
cd backend/cedro-backend
# Windows:
run.bat
# Linux/Mac:
./mvnw spring-boot:run
```

### Scripts disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza a build de produção

## 🛠️ Tecnologias

### Frontend
- React 18
- Vite
- React Router DOM
- Bootstrap 5
- Bootstrap Icons

### Backend
- Spring Boot 3.5.6
- Spring Security
- Spring Data JPA
- JWT Authentication
- SQL Server

## 📁 Estrutura do projeto
```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React (Auth, etc)
├── pages/          # Páginas da aplicação
├── styles/         # Arquivos de estilo
├── App.jsx         # Componente principal
└── main.jsx        # Ponto de entrada

backend/cedro-backend/
├── src/main/java/com/cedro/
│   ├── controller/     # Controllers REST
│   ├── service/        # Lógica de negócio
│   ├── repository/     # Repositórios JPA
│   ├── model/          # Entidades e DTOs
│   ├── config/         # Configurações
│   └── security/       # Segurança JWT
├── .env            # Variáveis de ambiente
└── pom.xml         # Dependências Maven
```

## 🔒 Segurança

**IMPORTANTE:** Antes de usar em produção, leia o arquivo [SECURITY.md](SECURITY.md)

- Configure o arquivo `.env` com suas próprias credenciais
- Use senhas fortes para o banco de dados
- Configure HTTPS em produção
- Mantenha as dependências atualizadas