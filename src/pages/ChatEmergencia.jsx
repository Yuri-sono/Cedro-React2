import React, { useState } from 'react';
import '../styles/chat-emergencia.css';

const ChatEmergencia = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Escolha uma das opções abaixo para receber apoio:",
      isUser: false
    }
  ]);
  const [currentStep, setCurrentStep] = useState('menu');

  const questionOptions = [
    {
      id: 'ansiedade',
      text: '😰 Estou sentindo ansiedade',
      response: "Entendo que você está sentindo ansiedade. Algumas técnicas que podem ajudar:\n\n• Respiração profunda: inspire por 4 segundos, segure por 4, expire por 6\n• Técnica 5-4-3-2-1: identifique 5 coisas que vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que saboreia\n• Lembre-se: este sentimento é temporário\n\nSe a ansiedade persistir, procure ajuda profissional."
    },
    {
      id: 'tristeza',
      text: '😢 Estou me sentindo triste',
      response: "Percebo que você está passando por um momento difícil. É importante lembrar:\n\n• Você não está sozinho nessa\n• Buscar ajuda é um sinal de força, não fraqueza\n• Pequenos passos já fazem diferença\n• Este momento vai passar\n\nSe a tristeza persistir, considere conversar com um profissional."
    },
    {
      id: 'panico',
      text: '😱 Estou tendo um ataque de pânico',
      response: "Vamos fazer um exercício para te ajudar agora:\n\n1. RESPIRE: Inspire pelo nariz (4 seg), segure (4 seg), expire pela boca (6 seg)\n2. OBSERVE: Olhe ao redor e nomeie 5 objetos que você vê\n3. LEMBRE-SE: Isso vai passar, você está seguro\n4. REPITA: Continue respirando devagar\n\nSe os ataques são frequentes, procure um médico."
    },
    {
      id: 'insonia',
      text: '😴 Não consigo dormir',
      response: "Problemas de sono são comuns. Algumas dicas que podem ajudar:\n\n• Evite telas 1h antes de dormir\n• Mantenha o quarto escuro e fresco\n• Vá para cama sempre no mesmo horário\n• Evite cafeína após 14h\n• Pratique relaxamento antes de dormir\n\nSe a insônia persistir, consulte um médico."
    },
    {
      id: 'trabalho',
      text: '💼 Problemas no trabalho',
      response: "O estresse no trabalho é muito comum. Estratégias que podem ajudar:\n\n• Defina limites entre trabalho e vida pessoal\n• Faça pausas regulares durante o dia\n• Priorize tarefas importantes\n• Pratique técnicas de relaxamento\n• Converse com colegas ou supervisor quando possível\n\nSe o estresse for excessivo, considere apoio profissional."
    },
    {
      id: 'relacionamento',
      text: '💔 Problemas de relacionamento',
      response: "Relacionamentos podem ser desafiadores. Algumas dicas:\n\n• Comunique seus sentimentos com clareza\n• Ouça ativamente o outro lado\n• Estabeleça limites saudáveis\n• Lembre-se que relacionamentos envolvem reciprocidade\n• Respeite seus próprios valores\n\nSe os conflitos persistirem, terapia de casal pode ajudar."
    },
    {
      id: 'autoestima',
      text: '🪞 Problemas de autoestima',
      response: "A autoestima é algo que podemos trabalhar. Lembre-se:\n\n• Você é único e tem valor\n• Ninguém é perfeito, e está tudo bem\n• Liste 3 coisas boas sobre você todo dia\n• Trate-se com a mesma gentileza que trataria um amigo\n• Celebre pequenas conquistas\n\nSe a baixa autoestima afetar muito sua vida, procure ajuda profissional."
    },
    {
      id: 'emergencia',
      text: '🚨 Pensamentos de autolesão',
      response: "🚨 ATENÇÃO: Sua vida tem valor e existem pessoas que podem te ajudar AGORA:\n\n📞 CVV - 188 (24h, gratuito)\n📞 CAPS - Centro de Atenção Psicossocial\n📞 UBS - Unidade Básica de Saúde\n📞 SAMU - 192\n\nVocê não precisa passar por isso sozinho. Por favor, ligue para um desses números AGORA ou vá ao hospital mais próximo."
    }
  ];

  const handleOptionClick = (option) => {
    // Adicionar pergunta do usuário
    const userMessage = {
      id: Date.now(),
      text: option.text,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Adicionar resposta após delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: option.response,
        isUser: false
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Mostrar opção de voltar ao menu
      setTimeout(() => {
        const menuMessage = {
          id: Date.now() + 2,
          text: "Posso te ajudar com mais alguma coisa?",
          isUser: false,
          showMenu: true
        };
        setMessages(prev => [...prev, menuMessage]);
      }, 1000);
    }, 1500);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        text: "Olá! Escolha uma das opções abaixo para receber apoio:",
        isUser: false
      }
    ]);
    setCurrentStep('menu');
  };

  return (
    <section className="chat-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow">
              <div className="card-header bg-success text-white py-3">
                <div className="d-flex align-items-center">
                  <div className="ai-avatar me-3">
                    <i className="bi bi-chat-heart fs-4"></i>
                  </div>
                  <div>
                    <h2 className="h4 mb-0">Apoio Psicológico - Cedro</h2>
                    <small className="opacity-75">Respostas Automáticas • Apoio Inicial</small>
                  </div>
                  <div className="ms-auto">
                    <span className="badge bg-light text-success">
                      <i className="bi bi-circle-fill me-1" style={{fontSize: '8px'}}></i>
                      Online
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-0">
                <div className="chat-container" style={{height: '400px', overflowY: 'auto'}}>
                  {messages.map(message => (
                    <div key={message.id} className={`chat-message ${message.isUser ? 'user' : 'bot'}`}>
                      <div className="message-content">
                        <p className="mb-0" style={{whiteSpace: 'pre-line'}}>{message.text}</p>
                        
                        {message.showMenu && (
                          <div className="mt-3">
                            <button 
                              className="btn btn-outline-success btn-sm"
                              onClick={resetChat}
                            >
                              🔄 Voltar ao menu principal
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Menu de Opções */}
                <div className="options-menu p-3 border-top bg-light">
                  <div className="row g-2">
                    {questionOptions.map(option => (
                      <div key={option.id} className="col-md-6">
                        <button 
                          className="btn btn-outline-primary w-100 text-start"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option.text}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="emergency-contact mt-4 text-center">
              <div className="alert alert-warning">
                <h5 className="alert-heading">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Em caso de emergência grave
                </h5>
                <p className="mb-3">Se você estiver em risco imediato, procure ajuda profissional:</p>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  <a href="tel:188" className="btn btn-danger">
                    <i className="bi bi-telephone-fill me-2"></i>CVV - 188
                  </a>
                  <a href="tel:192" className="btn btn-warning">
                    <i className="bi bi-ambulance me-2"></i>SAMU - 192
                  </a>
                  <a href="tel:190" className="btn btn-primary">
                    <i className="bi bi-shield me-2"></i>Polícia - 190
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatEmergencia;