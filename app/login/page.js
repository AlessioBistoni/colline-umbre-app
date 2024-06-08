'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from "./login.module.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Stato per memorizzare le informazioni dell'utente
  const router = useRouter();

  useEffect(() => {
    // Controlla se esiste un cookie con le informazioni dell'utente
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Memorizza le informazioni dell'utente nello stato e nei cookie
        setUser(data.user);
        Cookies.set('user', JSON.stringify(data.user), { expires: 1 }); // Imposta il cookie per 1 giorno
        // Login riuscito, reindirizza l'utente alla dashboard o alla pagina desiderata
        router.push('/shop');
      } else {
        setError(data.message || 'Errore durante il login');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Errore durante il login');
    }
  };

  const handleLogout = () => {
    // Rimuovi le informazioni dell'utente dallo stato e dai cookie
    setUser(null);
    Cookies.remove('user');
    router.push('/shop'); // Reindirizza alla pagina di login
  };

  return (
    <div className={styles.container}>
      {!user ? (
        <> 

        <div className={styles.accesso}>
          <h1>Accedi</h1>
          <form onSubmit={handleLogin}>
            <div className={styles.email}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.password}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p className={styles.descrizione}>
            Accedendo a Colline Umbre, troverai la lista dei miei vini e potrai acquistarli direttamente online con pochi clic.
            </p>
            <button type="submit">Accedi</button>
          </form>
          </div>

        </>
      ) : (

        <div className={styles.logout}>
          <h1>Ciao, {user.nome}</h1>
          <h2>Hai già effettuato l'accesso</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

      )}
    </div>
  );
}
