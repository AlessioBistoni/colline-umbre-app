"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layout/LayoutAdmin';
import styles from './Users.module.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) {
          throw new Error('Errore durante il recupero degli utenti');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Errore durante il recupero degli utenti:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
    <div className={styles.container}>
      <h1>Utenti Registrati</h1>
      <div className={styles.tabellaUtentiContainer}>
      <table className={styles.tabellaUtenti}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className={styles.tabellaBody}>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.cognome}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </AdminLayout>
  );
};

export default UsersPage;
