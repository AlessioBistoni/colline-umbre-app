// components/Bottone.js
import React, { useState } from 'react';

const Bottone = ({ userId, wineId }) => {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, wineId }),
      });
      if (!response.ok) {
        throw new Error('Errore durante l aggiunta al carrello');
      }
      setMessage('Vino aggiunto al carrello con successo');
    } catch (error) {
      console.error('Errore durante l aggiunta al carrello:', error.message);
      setMessage('luser id è: ' + userId + ' e il wine id è: ' + wineId);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Aggiungi al carrello</button>
      <p>{message}</p>
    </div>
  );
};

export default Bottone;
