"use client"
import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layout/LayoutAdmin';

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
      <div>
        <h1>Messaggi</h1>
        <button onClick={deleteAllMessages}>Elimina tutti i messaggi</button>
        <ul>
          {messages.map(message => (
            <li key={message.id}>
              <p><strong>Da:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Messaggio:</strong> {message.message}</p>
              <p><strong>Data:</strong> {message.sent_date}</p>
              <p><strong>Ora:</strong> {message.sent_time}</p>
              <button onClick={() => deleteMessage(message.id)}>Elimina</button>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default MessagesPage;
