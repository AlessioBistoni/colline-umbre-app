"use client"
import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layout/LayoutAdmin';
import styles from './Messaggi.module.css';
const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/messages');
      if (!response.ok) {
        throw new Error('Errore nel recupero dei messaggi');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Errore durante l\'eliminazione del messaggio');
      }
      fetchMessages(); // Aggiorna la lista dei messaggi dopo l'eliminazione
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteAllMessages = async () => {
    // Mostra una finestra di conferma
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare tutti i messaggi?');
    
    if (confirmDelete) {
      try {
        const response = await fetch('http://localhost:3001/api/messages', {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Errore durante l\'eliminazione di tutti i messaggi');
        }
        fetchMessages(); // Aggiorna la lista dei messaggi dopo l'eliminazione di tutti
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log('Eliminazione annullata');
    }
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
      {messages.length === 0 ? (
        <h1 className={styles.nessunMessaggio}>Nella casella non sono presenti messaggi</h1>
      ) : (
        <div>
        <h1 className='ms-5'>Messaggi</h1>
          {messages.map(message => (
            <div className={styles.schedaMessaggio}>
            <div key={message.id}>
              <p><strong>Da:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Messaggio:</strong> {message.message}</p>
              <p><strong>Data:</strong> {message.sent_date}</p>
              <p><strong>Ora:</strong> {message.sent_time}</p>
              <button className="btn btn-primary" onClick={() => deleteMessage(message.id)}>Elimina</button>
            </div>
            </div>
          ))}
        <button className="btn btn-primary ms-5" onClick={deleteAllMessages}>Elimina tutti i messaggi</button>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};

export default MessagesPage;
