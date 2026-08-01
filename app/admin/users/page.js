"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layout/LayoutAdmin';
import styles from './Users.module.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Errore durante il recupero degli utenti');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Errore durante la cancellazione dell\'utente');
      }
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Errore durante la cancellazione dell\'utente:', error.message);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1>Utenti Registrati</h1>
        {loading ? (
          <p>Caricamento in corso...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.tabellaUtentiContainer}>
            <table className={styles.tabellaUtenti}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cognome</th>
                  <th>Email</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody className={styles.tabellaBody}>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.cognome}</td>
                    <td>{user.email}</td>
                    <td>
                    {user.admin ? (
                        <span>admin</span>
                      ) : (
                        <button className='btn btn-primary' onClick={() => handleDelete(user.id)}>Elimina</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersPage;