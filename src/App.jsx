import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import Home from './pages/Home.jsx';
import ChatEmergencia from './pages/ChatEmergencia.jsx';
import TerapiaIndividual from './pages/TerapiaIndividual.jsx';
import TerapiaGrupo from './pages/TerapiaGrupo.jsx';
import AtendimentoOnline from './pages/AtendimentoOnline.jsx';
import MeditacoesGuiadas from './pages/MeditacoesGuiadas.jsx';
import Ebooks from './pages/Ebooks.jsx';
import Webinars from './pages/Webinars.jsx';
import Perfil from './pages/Perfil.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat-emergencia" element={<ChatEmergencia />} />
          <Route path="/terapia-individual" element={<TerapiaIndividual />} />
          <Route path="/terapia-grupo" element={<TerapiaGrupo />} />
          <Route path="/atendimento-online" element={<AtendimentoOnline />} />
          <Route path="/meditacoes-guiadas" element={<MeditacoesGuiadas />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;