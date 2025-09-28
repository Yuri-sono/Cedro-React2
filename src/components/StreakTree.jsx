import React, { useState, useEffect } from 'react';

const StreakTree = () => {
  const [streak, setStreak] = useState(0);
  const [showTree, setShowTree] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);

  useEffect(() => {
    const updateStreak = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('lastVisit');
      const currentStreak = parseInt(localStorage.getItem('streak') || '0');
      
      if (lastVisit !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastVisit === yesterday.toDateString()) {
          // Sequência continua
          const newStreak = currentStreak + 1;
          
          // Animação de crescimento
          setIsGrowing(true);
          setTimeout(() => {
            setStreak(newStreak);
            localStorage.setItem('streak', newStreak.toString());
            setIsGrowing(false);
          }, 1000);
          
          // Notificação de streak
          window.dispatchEvent(new CustomEvent('showNotification', {
            detail: {
              message: `🌱 Sequência de ${newStreak} dias! Sua árvore está crescendo!`,
              type: 'success'
            }
          }));
        } else if (!lastVisit) {
          // Primeira visita
          setIsGrowing(true);
          setTimeout(() => {
            setStreak(1);
            localStorage.setItem('streak', '1');
            setIsGrowing(false);
          }, 800);
          
          window.dispatchEvent(new CustomEvent('showNotification', {
            detail: {
              message: '🌱 Bem-vindo! Sua jornada de bem-estar começou!',
              type: 'success'
            }
          }));
        } else {
          // Sequência quebrada
          setIsGrowing(true);
          setTimeout(() => {
            setStreak(1);
            localStorage.setItem('streak', '1');
            setIsGrowing(false);
          }, 600);
          
          window.dispatchEvent(new CustomEvent('showNotification', {
            detail: {
              message: '🌱 Nova sequência iniciada! Vamos crescer juntos!',
              type: 'info'
            }
          }));
        }
        
        localStorage.setItem('lastVisit', today);
      } else {
        setStreak(currentStreak);
      }
    };

    updateStreak();
  }, []);

  const getTreeStage = (days) => {
    if (days >= 30) return { icon: '🌳', stage: 'Árvore Frondosa', color: '#2d5016' };
    if (days >= 21) return { icon: '🌲', stage: 'Árvore Adulta', color: '#3d6b1f' };
    if (days >= 14) return { icon: '🌿', stage: 'Árvore Jovem', color: '#4d7c2a' };
    if (days >= 7) return { icon: '🌱', stage: 'Broto Forte', color: '#5d8d35' };
    if (days >= 3) return { icon: '🌱', stage: 'Broto', color: '#6d9e40' };
    return { icon: '🌱', stage: 'Semente', color: '#7daf4b' };
  };

  const tree = getTreeStage(streak);

  return (
    <>
      <div 
        className={`streak-tree ${isGrowing ? 'growing' : ''}`}
        onClick={() => setShowTree(!showTree)}
        title={`${streak} dias consecutivos - ${tree.stage}`}
      >
        <div className="tree-icon" style={{ color: tree.color }}>
          {tree.icon}
        </div>
        <div className="streak-count">{streak}</div>
        {isGrowing && <div className="growth-particles"></div>}
      </div>

      {showTree && (
        <div className="tree-modal" onClick={() => setShowTree(false)}>
          <div className="tree-content" onClick={e => e.stopPropagation()}>
            <div className="tree-header">
              <h4>Sua Jornada de Bem-estar</h4>
              <button onClick={() => setShowTree(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="tree-body">
              <div className="tree-display">
                <div className="tree-large" style={{ color: tree.color }}>
                  {tree.icon}
                </div>
                <h3>{tree.stage}</h3>
                <p className="streak-text">{streak} dias consecutivos</p>
              </div>
              
              <div className="tree-stages">
                <div className="stage-item">
                  <span className="stage-icon">🌱</span>
                  <span>Semente (1-2 dias)</span>
                </div>
                <div className="stage-item">
                  <span className="stage-icon">🌱</span>
                  <span>Broto (3-6 dias)</span>
                </div>
                <div className="stage-item">
                  <span className="stage-icon">🌱</span>
                  <span>Broto Forte (7-13 dias)</span>
                </div>
                <div className="stage-item">
                  <span className="stage-icon">🌿</span>
                  <span>Árvore Jovem (14-20 dias)</span>
                </div>
                <div className="stage-item">
                  <span className="stage-icon">🌲</span>
                  <span>Árvore Adulta (21-29 dias)</span>
                </div>
                <div className="stage-item">
                  <span className="stage-icon">🌳</span>
                  <span>Árvore Frondosa (30+ dias)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StreakTree;