import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Scroll animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const checkIfInView = () => {
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('show');
        }
      });
    };
    
    checkIfInView();
    window.addEventListener('scroll', checkIfInView);
    
    return () => window.removeEventListener('scroll', checkIfInView);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <header className="hero-section text-white text-center py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 animate-on-scroll">
              <h1 className="display-4 fw-bold mb-4">Apoio psicológico ao seu alcance</h1>
              <p className="lead mb-4">O Cedro está aqui para oferecer suporte emocional e psicológico quando você mais precisa. Dê o primeiro passo em direção ao seu bem-estar.</p>
              <div className="d-flex justify-content-center gap-3">
                <a href="#contato" className="btn btn-light btn-lg">Agendar Consulta</a>
                <a href="#recursos" className="btn btn-outline-light btn-lg">Recursos Gratuitos</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sobre Nós */}
      <section id="sobre" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll">
              <div className="rounded-3 shadow overflow-hidden">
                <div className="bg-secondary text-white p-5 text-center">
                  <i className="bi bi-tree fs-1 mb-3"></i>
                  <h3 className="h4 fw-bold">Como o cedro, oferecemos força e abrigo</h3>
                  <p className="mb-0">Uma equipe dedicada ao seu bem-estar emocional</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 animate-on-scroll">
              <h2 className="fw-bold mb-4">Sobre o Cedro</h2>
              <p className="lead">Somos uma equipe dedicada de profissionais de saúde mental comprometidos em fornecer apoio psicológico acessível e de qualidade.</p>
              <p>O Cedro nasceu da necessidade de criar um espaço seguro onde as pessoas possam buscar ajuda sem julgamentos. Assim como a árvore cedro é conhecida por sua força e resiliência, acreditamos que cada pessoa possui a capacidade de superar desafios e crescer através das dificuldades.</p>
              <p>Nossa missão é quebrar o estigma em torno da saúde mental e garantir que todos tenham acesso aos recursos necessários para cuidar do seu bem-estar emocional.</p>
              <div className="d-flex mt-4">
                <div className="me-4">
                  <h3 className="h5 fw-bold">Nossa Visão</h3>
                  <p>Um mundo onde cuidar da saúde mental seja tão natural quanto cuidar da saúde física.</p>
                </div>
                <div>
                  <h3 className="h5 fw-bold">Nossos Valores</h3>
                  <p>Empatia, respeito, confidencialidade e compromisso com o bem-estar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Nossos Serviços</h2>
          <div className="row g-4">
            <div className="col-md-4 animate-on-scroll">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-4">
                    <i className="bi bi-person-hearts text-primary fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold">Terapia Individual</h3>
                  <p>Sessões personalizadas para abordar questões específicas como ansiedade, depressão, estresse e traumas.</p>
                  <Link to="/terapia-individual" className="btn btn-outline-primary mt-3">Saiba mais</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 animate-on-scroll">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-4">
                    <i className="bi bi-people text-primary fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold">Terapia em Grupo</h3>
                  <p>Encontros terapêuticos em grupo que proporcionam apoio mútuo e compartilhamento de experiências.</p>
                  <Link to="/terapia-grupo" className="btn btn-outline-primary mt-3">Saiba mais</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 animate-on-scroll">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-4">
                    <i className="bi bi-laptop text-primary fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold">Atendimento Online</h3>
                  <p>Consultas virtuais para quem prefere ou necessita de atendimento à distância, com a mesma qualidade.</p>
                  <Link to="/atendimento-online" className="btn btn-outline-primary mt-3">Saiba mais</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Recursos Gratuitos</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3 animate-on-scroll">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box mb-3">
                    <i className="bi bi-headphones text-primary fs-1"></i>
                  </div>
                  <h3 className="h5 fw-bold">Meditações Guiadas</h3>
                  <p>Áudios gratuitos para ajudar na prática de mindfulness e relaxamento.</p>
                  <Link to="/meditacoes-guiadas" className="btn btn-sm btn-primary">Acessar</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 animate-on-scroll">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box mb-3">
                    <i className="bi bi-book text-primary fs-1"></i>
                  </div>
                  <h3 className="h5 fw-bold">E-books</h3>
                  <p>Materiais educativos sobre saúde mental e autocuidado emocional.</p>
                  <Link to="/ebooks" className="btn btn-sm btn-primary">Baixar</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 animate-on-scroll">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box mb-3">
                    <i className="bi bi-camera-video text-primary fs-1"></i>
                  </div>
                  <h3 className="h5 fw-bold">Webinars</h3>
                  <p>Palestras online sobre temas relevantes para o bem-estar psicológico.</p>
                  <Link to="/webinars" className="btn btn-sm btn-primary">Assistir</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 animate-on-scroll">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box mb-3">
                    <i className="bi bi-clipboard-check text-primary fs-1"></i>
                  </div>
                  <h3 className="h5 fw-bold">Autoavaliações</h3>
                  <p>Ferramentas para ajudar a identificar sinais de ansiedade e depressão.</p>
                  <a href="#" className="btn btn-sm btn-primary">Realizar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Depoimentos</h2>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="testimonial-item text-center p-4">
                      <div className="testimonial-img mb-4">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', margin: '0 auto'}}>
                          <span className="fw-bold fs-4">MS</span>
                        </div>
                      </div>
                      <p className="testimonial-text mb-3">"O apoio que recebi do Cedro foi fundamental para minha recuperação. Os profissionais são extremamente capacitados e acolhedores."</p>
                      <h5 className="fw-bold mb-1">Maria S.</h5>
                      <p className="text-muted">Cliente há 1 ano</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="testimonial-item text-center p-4">
                      <div className="testimonial-img mb-4">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', margin: '0 auto'}}>
                          <span className="fw-bold fs-4">CR</span>
                        </div>
                      </div>
                      <p className="testimonial-text mb-3">"As sessões online foram perfeitas para minha rotina agitada. Consegui cuidar da minha saúde mental sem sair de casa."</p>
                      <h5 className="fw-bold mb-1">Carlos R.</h5>
                      <p className="text-muted">Cliente há 6 meses</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="testimonial-item text-center p-4">
                      <div className="testimonial-img mb-4">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', margin: '0 auto'}}>
                          <span className="fw-bold fs-4">AP</span>
                        </div>
                      </div>
                      <p className="testimonial-text mb-3">"A terapia em grupo me mostrou que não estou sozinha. Encontrei apoio e compreensão que não imaginava ser possível."</p>
                      <h5 className="fw-bold mb-1">Ana P.</h5>
                      <p className="text-muted">Cliente há 8 meses</p>
                    </div>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Próximo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ajuda Emergencial */}
      <section id="ajuda" className="py-5 text-white ajuda-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0 animate-on-scroll">
              <h2 className="fw-bold mb-4">Precisa de ajuda imediata?</h2>
              <p className="lead mb-4">Se você está passando por uma crise ou emergência psicológica, não hesite em buscar ajuda. Estamos aqui para você 24 horas por dia, 7 dias por semana.</p>
              <div className="d-flex flex-column flex-md-row gap-3">
                <a href="tel:188" className="btn btn-light btn-lg">
                  <i className="bi bi-telephone me-2"></i> Ligue 188 (CVV)
                </a>
                <Link to="/chat-emergencia" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-chat-dots me-2"></i> Chat de Emergência
                </Link>
              </div>
            </div>
            <div className="col-lg-5 animate-on-scroll">
              <div className="card border-0 shadow">
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-3 text-dark">Sinais de alerta</h3>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-exclamation-triangle me-3 text-warning fs-4"></i>
                      <span className="text-dark">Pensamentos suicidas ou de autoagressão</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-exclamation-triangle me-3 text-warning fs-4"></i>
                      <span className="text-dark">Sentimento de desesperança intensa</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="bi bi-exclamation-triangle me-3 text-warning fs-4"></i>
                      <span className="text-dark">Isolamento social extremo</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle me-3 text-warning fs-4"></i>
                      <span className="text-dark">Mudanças drásticas de comportamento</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0 animate-on-scroll">
              <h2 className="fw-bold mb-4">Entre em contato</h2>
              <p className="mb-4">Estamos aqui para responder suas dúvidas e ajudar você a dar o primeiro passo em direção ao seu bem-estar emocional.</p>
              
              <div className="contact-info">
                <div className="d-flex mb-3">
                  <div className="icon-box me-3">
                    <i className="bi bi-geo-alt text-primary fs-4"></i>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Endereço</h3>
                    <p className="mb-0">Av. Principal, 1000 - Centro, Barueri - SP</p>
                  </div>
                </div>
                
                <div className="d-flex mb-3">
                  <div className="icon-box me-3">
                    <i className="bi bi-telephone text-primary fs-4"></i>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Telefone</h3>
                    <p className="mb-0">(11) 4000-0000</p>
                  </div>
                </div>
                
                <div className="d-flex mb-3">
                  <div className="icon-box me-3">
                    <i className="bi bi-envelope text-primary fs-4"></i>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Email</h3>
                    <p className="mb-0">contato@cedro.org</p>
                  </div>
                </div>
                
                <div className="d-flex">
                  <div className="icon-box me-3">
                    <i className="bi bi-clock text-primary fs-4"></i>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Horário de Atendimento</h3>
                    <p className="mb-0">Segunda a Sexta: 8h às 20h<br />Sábado: 9h às 15h</p>
                  </div>
                </div>
              </div>
              
              <div className="social-media mt-4">
                <h3 className="h6 fw-bold mb-3">Siga-nos nas redes sociais</h3>
                <div className="d-flex gap-3">
                  <a href="#" className="text-primary fs-4"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-primary fs-4"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="text-primary fs-4"><i className="bi bi-twitter"></i></a>
                  <a href="#" className="text-primary fs-4"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 animate-on-scroll">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-4">Envie uma mensagem</h3>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="name" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="phone" className="form-label">Telefone</label>
                        <input type="tel" className="form-control" id="phone" />
                      </div>
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">Assunto</label>
                        <select className="form-select" id="subject" required>
                          <option value="" disabled>Selecione uma opção</option>
                          <option value="agendamento">Agendamento de Consulta</option>
                          <option value="informacoes">Informações sobre Serviços</option>
                          <option value="feedback">Feedback</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">Mensagem</label>
                        <textarea className="form-control" id="message" rows="4" required></textarea>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="privacy" required />
                          <label className="form-check-label" htmlFor="privacy">
                            Concordo com a <a href="#">Política de Privacidade</a>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;