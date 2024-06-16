"use client";
import { useEffect, useState } from 'react';
import LayoutAdmin from '../Layout/LayoutAdmin';
import styles from './Messaggi.module.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/messages');
        if (!res.ok) {
          throw new Error('Errore nel recupero dei messaggi');
        }
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);


  
  return (
    <LayoutAdmin>
    <div className={styles.container}>
      <h1>Messaggi in arrivo</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>Nome:</strong> {message.name} <br />
            <strong>Email:</strong> {message.email} <br />
            <strong>Messaggio:</strong> {message.message} <br />
          </li>
        ))}
      </ul>
    </div>
    </LayoutAdmin>
  );
};

export default Messages;
