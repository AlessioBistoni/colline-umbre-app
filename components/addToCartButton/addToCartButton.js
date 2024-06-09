// components/Bottone.js
import React, { useState } from 'react';
import Image from "next/image";
import styles from './addToCart.module.css';

const Bottone = ({ userId, wineId }) => {
//   const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

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

      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);

    } catch (error) {
      console.error('Errore durante l aggiunta al carrello:', error.message);

    }
  };

  return (
    <div >
      <button className={`${styles.cartIcon} btn btn-success`} onClick={handleClick}>

      
        {showMessage ? (
        <Image
        src="/icon/ok.png"
        alt="cerrllo"
        layout="responsive"
        width={32}
        height={32}
        className={styles.cartIcon}
      />

      ):(
      
        <Image
        src="/icon/cart.png"
        alt="cerrllo"
        layout="responsive"
        width={32}
        height={32}
        className={styles.cartIcon}
      />

      )}
        

      </button>
      
    </div>
  );
};

export default Bottone;
