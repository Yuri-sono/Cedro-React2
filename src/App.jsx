import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import EmergencyButton from './components/EmergencyButton.jsx';
import './styles/emergency-button.css';
import './styles/dashboard-terapeuta.css';
import './styles/navbar-spacing.css';
import './styles/theme.css';
import './styles/notifications.css';

import ThemeToggle from './components/ThemeToggle.jsx';
import NotificationSystem from './components/NotificationSystem.jsx';

import Home from './pages/Home.jsx';
import ChatEmergencia from './pages/ChatEmergencia.jsx';
import Contato from './pages/Contato.jsx';
import TerapiaIndividual from './pages/TerapiaIndividual.jsx';
import TerapiaGrupo from './pages/TerapiaGrupo.jsx';
import AtendimentoOnline from './pages/AtendimentoOnline.jsx';
import MeditacoesGuiadas from './pages/MeditacoesGuiadas.jsx';
import Ebooks from './pages/Ebooks.jsx';
import Webinars from './pages/Webinars.jsx';
import Perfil from './pages/Perfil.jsx';
import Login from './pages/Login.jsx';
import ListaTerapeutas from './pages/ListaTerapeutas.jsx';
import CadastroTerapeuta from './pages/CadastroTerapeuta.jsx';
import LoginTerapeuta from './pages/LoginTerapeuta.jsx';
import DashboardTerapeuta from './pages/DashboardTerapeuta.jsx';
import AgendaTerapeuta from './pages/AgendaTerapeuta.jsx';
import PacientesTerapeuta from './pages/PacientesTerapeuta.jsx';
import ConsultasTerapeuta from './pages/ConsultasTerapeuta.jsx';
import FinanceiroTerapeuta from './pages/FinanceiroTerapeuta.jsx';
import TermosUso from './pages/TermosUso.jsx';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade.jsx';
import Autoavaliacao from './pages/Autoavaliacao.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat-emergencia" element={<ChatEmergencia />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/terapia-individual" element={<TerapiaIndividual />} />
            <Route path="/terapia-grupo" element={<TerapiaGrupo />} />
            <Route path="/terapia-individual" element={<TerapiaIndividual />} />
            <Route path="/terapia-grupo" element={<TerapiaGrupo />} />
            <Route path="/atendimento-online" element={<AtendimentoOnline />} />
            <Route path="/meditacoes-guiadas" element={<MeditacoesGuiadas />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/terapeutas" element={<ListaTerapeutas />} />
            <Route path="/cadastro-terapeuta" element={<CadastroTerapeuta />} />
            <Route path="/login-terapeuta" element={<LoginTerapeuta />} />
            <Route path="/terapeuta/dashboard" element={
              <ProtectedRoute requiredUserType="terapeuta">
                <DashboardTerapeuta />
              </ProtectedRoute>
            } />
            <Route path="/terapeuta/agenda" element={
              <ProtectedRoute requiredUserType="terapeuta">
                <AgendaTerapeuta />
              </ProtectedRoute>
            } />
            <Route path="/terapeuta/pacientes" element={
              <ProtectedRoute requiredUserType="terapeuta">
                <PacientesTerapeuta />
              </ProtectedRoute>
            } />
            <Route path="/terapeuta/consultas" element={
              <ProtectedRoute requiredUserType="terapeuta">
                <ConsultasTerapeuta />
              </ProtectedRoute>
            } />
            <Route path="/terapeuta/financeiro" element={
              <ProtectedRoute requiredUserType="terapeuta">
                <FinanceiroTerapeuta />
              </ProtectedRoute>
            } />
            <Route path="/termos-uso" element={<TermosUso />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/autoavaliacao" element={<Autoavaliacao />} />
          </Routes>
          <Footer />
          <BackToTop />
          <EmergencyButton />
          <ThemeToggle />
          <NotificationSystem />

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;