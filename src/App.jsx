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
import './styles/dashboard-psicologo.css';
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
import CadastroPsicologo from './pages/CadastroPsicologo.jsx';
import LoginPsicologo from './pages/LoginPsicologo.jsx';
import DashboardPsicologo from './pages/DashboardPsicologo.jsx';
import AgendaPsicologo from './pages/AgendaPsicologo.jsx';
import PacientesPsicologo from './pages/PacientesPsicologo.jsx';
import ConsultasPsicologo from './pages/ConsultasPsicologo.jsx';
import FinanceiroPsicologo from './pages/FinanceiroPsicologo.jsx';
import TermosUso from './pages/TermosUso.jsx';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade.jsx';
import Autoavaliacoes from './pages/Autoavaliacoes.jsx';

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
            <Route path="/psicologos" element={<ListaTerapeutas />} />
            <Route path="/cadastro-psicologo" element={<CadastroPsicologo />} />
            <Route path="/login-psicologo" element={<LoginPsicologo />} />
            <Route path="/psicologo/dashboard" element={
              <ProtectedRoute requiredUserType="psicologo">
                <DashboardPsicologo />
              </ProtectedRoute>
            } />
            <Route path="/psicologo/agenda" element={
              <ProtectedRoute requiredUserType="psicologo">
                <AgendaPsicologo />
              </ProtectedRoute>
            } />
            <Route path="/psicologo/pacientes" element={
              <ProtectedRoute requiredUserType="psicologo">
                <PacientesPsicologo />
              </ProtectedRoute>
            } />
            <Route path="/psicologo/consultas" element={
              <ProtectedRoute requiredUserType="psicologo">
                <ConsultasPsicologo />
              </ProtectedRoute>
            } />
            <Route path="/psicologo/financeiro" element={
              <ProtectedRoute requiredUserType="psicologo">
                <FinanceiroPsicologo />
              </ProtectedRoute>
            } />
            <Route path="/termos-uso" element={<TermosUso />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/autoavaliacoes" element={<Autoavaliacoes />} />
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