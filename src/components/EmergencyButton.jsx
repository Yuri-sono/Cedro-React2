import React from 'react';

const EmergencyButton = () => {
  const handleEmergencyCall = () => {
    window.location.href = 'tel:188';
  };

  return (
    <button
      className="emergency-btn"
      onClick={handleEmergencyCall}
      title="Ligar para CVV - 188"
    >
      <i className="bi bi-telephone-fill"></i>
      <span>SOS</span>
    </button>
  );
};

export default EmergencyButton;