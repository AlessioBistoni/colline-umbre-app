"use client";
import React, { useState, useEffect } from 'react';
import styles from './Carrello.module.css';
import Footer from "@/components/footer/footer.js";

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
        console.log(data);
        setCartItems(data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati del carrello:', error.message);
      }
    };

    fetchCartItems();
  }, []);

  const handleIncreaseQuantity = async (wineId) => {
    try {
      const response = await fetch('http://localhost:3001/api/cart/increase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, wineId }),
      });
      if (!response.ok) {
        throw new Error('Errore durante l\'aumento della quantità');
      }
      const updatedCartItems = cartItems.map(item =>
        item.wine_id === wineId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Errore durante l\'aumento della quantità:', error.message);
    }
  };

  const handleDecreaseQuantity = async (wineId) => {
    try {
      const response = await fetch('http://localhost:3001/api/cart/decrease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, wineId }),
      });
      if (!response.ok) {
        throw new Error('Errore durante la diminuzione della quantità');
      }
      const updatedCartItems = cartItems.map(item =>
        item.wine_id === wineId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0); // Rimuovi l'elemento se la quantità è 0
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Errore durante la diminuzione della quantità:', error.message);
    }
  };

  const handleRemoveItem = async (wineId) => {
    try {
      const response = await fetch('http://localhost:3001/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, wineId }),
      });
      if (!response.ok) {
        throw new Error('Errore durante la rimozione del prodotto dal carrello');
      }
      const updatedCartItems = cartItems.filter(item => item.wine_id !== wineId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Errore durante la rimozione del prodotto dal carrello:', error.message);
    }
  };



  return (
    <div>
    <div className={styles.container}>
      <h1>Carrello</h1>
      {cartItems.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <div>
        <ul>
          {cartItems.map(item => (
            <div className={styles.scheda} key={item.id}>
              <li>
                <h1>{item.name}</h1>
                <p>Prezzo: {item.price * item.quantity} €</p>
                <p>Quantità: {item.quantity}</p>

                
                <button onClick={() => handleIncreaseQuantity(item.wine_id)}>Aumenta</button>
                <button onClick={() => handleDecreaseQuantity(item.wine_id)}>Diminuisci</button>
                <button onClick={() => handleRemoveItem(item.wine_id)}>Rimuovi</button>
              </li>
            </div>
          ))}
        </ul>

        
        <p>il totale è </p>
        </div>
        
      )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
