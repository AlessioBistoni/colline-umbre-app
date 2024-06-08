"use client";import React, { useEffect, useState } from 'react';

const Cart = () => {
  const userId = 2; // Imposta l'ID utente direttamente nel componente
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cart?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          console.error('Errore nel recupero del carrello');
        }
      } catch (error) {
        console.error('Errore:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  return (
    <div>
      <h1>Carrello</h1>
      {cartItems.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <h2>{item.cardTitle}</h2>
              <p>{item.cardPrice}€</p>
              <p>{item.cardAnno}</p>
              <p>{item.cardTipo}</p>
              <p>{item.short_description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
