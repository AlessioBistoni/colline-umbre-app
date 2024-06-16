// components/DeleteButton.js
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './removeWineButton.module.css';

const DeleteButton = ({ wineId }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = async () => {
    // Mostra un messaggio di conferma
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare questo vino?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3001/api/wines/${wineId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione del vino");
        }

        // Mostra il messaggio di successo per 2 secondi
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          // Aggiorna la pagina dopo l'eliminazione
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Errore durante l'eliminazione del vino:", error.message);
      }
    }
  };

  return (
    <div>
      <button className={`${styles.cartIcoContainer} btn btn-danger`} onClick={handleClick}>
        {showMessage ? (
          <Image src="/icon/ok.png" alt="ok" width={32} height={32} className={styles.cartIcon} />
        ) : (
          <p className={styles.elimina}>elimina</p>
        )}
      </button>
    </div>
  );
};

export default DeleteButton;
