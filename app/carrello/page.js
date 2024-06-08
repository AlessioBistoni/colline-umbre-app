"use client";
// pages/cart.js
import React, { useState, useEffect } from 'react';
import styles from './Carrello.module.css';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // ID dell'utente, da sostituire con l'ID reale dell'utente loggato

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cart/${userId}`);
        if (!response.ok) {
          throw new Error('Errore durante il recupero dei dati del carrello');
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati del carrello:', error.message);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Carrello</h1>
      {cartItems.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <ul>
          {cartItems.map(item => (
          <div className={styles.scheda}>
            <li key={item.id}>

              <h1>{item.name}</h1>
              <p>Prezzo: {item.price * item.quantity} €</p>
              <p>Quantità: {item.quantity}</p>
            </li>
          </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
