import React, { useState, useEffect, useRef } from 'react';

const ChatEmergencia = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá, estou aqui para ajudar você a se acalmar. Vamos conversar um pouco?",
      isUser: false
    }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const [currentOptions, setCurrentOptions] = useState([
    "Sim, estou me sentindo ansioso(a)",
    "Estou tendo pensamentos negativos",
    "Estou em pânico",
    "Preciso conversar com alguém"
  ]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text, isUser = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const selectOption = (option) => {
    addMessage(option, true);
    setShowOptions(false);

    setTimeout(() => {
      handleResponse(option);
    }, 500);
  };

  const handleResponse = (option) => {
    const responses = {
      "Sim, estou me sentindo ansioso(a)": {
        message: "É normal sentir ansiedade às vezes. Vamos fazer um exercício de respiração juntos para ajudar a acalmar seu sistema nervoso.",
        followUp: () => showBreathingExercise()
      },
      "Estou tendo pensamentos negativos": {
        message: "Entendo que pensamentos negativos podem ser difíceis. Vamos tentar um exercício de aterramento para trazer sua mente para o momento presente.",
        followUp: () => showGroundingExercise()
      },
      "Estou em pânico": {
        message: "Sinto muito que você esteja passando por isso. Vamos tentar uma técnica rápida para reduzir os sintomas de pânico. Primeiro, respire profundamente comigo.",
        followUp: () => showPanicHelp()
      },
      "Preciso conversar com alguém": {
        message: "É importante buscar apoio quando precisamos. Além deste chat, você pode ligar para o CVV (188) a qualquer momento. Gostaria de tentar alguma técnica de relaxamento enquanto isso?",
        options: ["Sim, por favor", "Não, preciso de contato humano"]
      },
      "Sim, por favor": {
        message: "Vamos fazer um exercício de respiração simples para ajudar a relaxar.",
        followUp: () => showBreathingExercise()
      },
      "Não, preciso de contato humano": {
        message: "Compreendo completamente. O contato humano é muito importante. Recomendo ligar para o CVV (188) agora mesmo, eles estão disponíveis 24h por dia.",
        followUp: () => showContactInfo()
      },
      "Melhor": {
        message: "Fico feliz em saber que você está se sentindo melhor! Lembre-se que estamos sempre aqui para ajudar.",
        options: ["Gostaria de mais orientações", "Encerrar o chat"]
      },
      "Ainda ansioso(a)": {
        message: "Vamos tentar outra abordagem. Às vezes precisamos de diferentes técnicas para encontrar o que funciona melhor para você.",
        options: ["Exercício de respiração", "Técnica de aterramento", "Visualização guiada"]
      }
    };

    const response = responses[option];
    if (response) {
      addMessage(response.message);
      
      if (response.followUp) {
        setTimeout(() => {
          response.followUp();
        }, 1000);
      }
      
      if (response.options) {
        setTimeout(() => {
          setCurrentOptions(response.options);
          setShowOptions(true);
        }, 1000);
      }
    }
  };

  const showBreathingExercise = () => {
    setTimeout(() => {
      addMessage("Vamos fazer um exercício de respiração 4-7-8:");
      setTimeout(() => {
        addMessage("1. Inspire silenciosamente pelo nariz contando até 4");
        setTimeout(() => {
          addMessage("2. Segure a respiração contando até 7");
          setTimeout(() => {
            addMessage("3. Expire completamente pela boca contando até 8");
            setTimeout(() => {
              addMessage("4. Repita este ciclo 4 vezes");
              setTimeout(() => {
                addMessage("Como você está se sentindo agora?");
                setCurrentOptions(["Melhor", "Ainda ansioso(a)", "Quero tentar outra técnica"]);
                setShowOptions(true);
              }, 3000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 1000);
    }, 500);
  };

  const showGroundingExercise = () => {
    setTimeout(() => {
      addMessage("Vamos praticar o exercício de aterramento 5-4-3-2-1. Observe ao seu redor e identifique:");
      setTimeout(() => {
        addMessage("• 5 coisas que você pode VER");
        setTimeout(() => {
          addMessage("• 4 coisas que você pode TOCAR");
          setTimeout(() => {
            addMessage("• 3 coisas que você pode OUVIR");
            setTimeout(() => {
              addMessage("• 2 coisas que você pode CHEIRAR");
              setTimeout(() => {
                addMessage("• 1 coisa que você pode PROVAR");
                setTimeout(() => {
                  addMessage("Este exercício ajuda a trazer sua mente para o momento presente. Como você está se sentindo?");
                  setCurrentOptions(["Melhor", "Ainda com pensamentos negativos", "Quero tentar outra técnica"]);
                  setShowOptions(true);
                }, 3000);
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 1000);
    }, 500);
  };

  const showPanicHelp = () => {
    setTimeout(() => {
      addMessage("Vamos fazer um exercício simples para reduzir o pânico:");
      setTimeout(() => {
        addMessage("1. Inspire lentamente pelo nariz contando até 4");
        setTimeout(() => {
          addMessage("2. Segure a respiração contando até 2");
          setTimeout(() => {
            addMessage("3. Expire lentamente pela boca contando até 6");
            setTimeout(() => {
              addMessage("4. Repita este ciclo 4 vezes");
              setTimeout(() => {
                addMessage("Lembre-se: ataques de pânico são temporários e vão passar. Você está seguro(a).");
                setTimeout(() => {
                  addMessage("Como você está se sentindo agora?");
                  setCurrentOptions(["Melhor", "Ainda em pânico", "Preciso de mais ajuda"]);
                  setShowOptions(true);
                }, 3000);
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 1000);
    }, 500);
  };

  const showContactInfo = () => {
    setTimeout(() => {
      addMessage("Aqui estão os contatos de emergência:");
      setTimeout(() => {
        addMessage("• CVV (Centro de Valorização da Vida): 188 (24 horas)");
        setTimeout(() => {
          addMessage("• SAMU: 192");
          setTimeout(() => {
            addMessage("• Cedro Atendimento: (11) 4000-0000 (horário comercial)");
            setTimeout(() => {
              addMessage("Como você está se sentindo agora?");
              setCurrentOptions(["Melhor", "Ainda preciso de ajuda"]);
              setShowOptions(true);
            }, 2000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 500);
  };

  return (
    <section className="chat-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow">
              <div className="card-header bg-primary text-white py-3">
                <h2 className="h4 mb-0 text-center">Chat de Emergência</h2>
              </div>
              <div className="card-body p-4">
                <div className="chat-container" ref={chatContainerRef}>
                  {messages.map(message => (
                    <div key={message.id} className={`chat-message ${message.isUser ? 'user' : 'bot'}`}>
                      <div className="message-content">
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {showOptions && (
                  <div className="response-options mt-4">
                    {currentOptions.map((option, index) => (
                      <button
                        key={index}
                        className="btn btn-outline-primary mb-2 w-100"
                        onClick={() => selectOption(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="emergency-contact mt-4 text-center">
                  <p className="mb-2">Se você estiver em uma emergência grave, por favor:</p>
                  <a href="tel:188" className="btn btn-danger">
                    <i className="bi bi-telephone me-2"></i> Ligue 188 (CVV)
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