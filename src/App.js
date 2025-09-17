import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import ChatEmergencia from './pages/ChatEmergencia';
import TerapiaIndividual from './pages/TerapiaIndividual';
import TerapiaGrupo from './pages/TerapiaGrupo';
import AtendimentoOnline from './pages/AtendimentoOnline';
import MeditacoesGuiadas from './pages/MeditacoesGuiadas';
import Ebooks from './pages/Ebooks';
import Webinars from './pages/Webinars';

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
        </Routes>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;