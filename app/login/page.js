'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from "./login.module.css";
import Footer from "@/components/footer/footer.js";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Per favore, compila entrambi i campi');
      return;
    }

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
        console.log('Login riuscito:', data);
        setUser(data.user);
        Cookies.set('user', JSON.stringify(data.user), { expires: 1 });
        router.push('/shop');
      } else {
        console.log('Errore durante il login:', data.message);
        setError(data.message || 'Errore durante il login');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Errore durante il login, per favore riprova più tardi');
    }
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('user');
    router.reload();
  };

  return (
    <div>
      <div className={styles.container}>
        {!user ? (
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
              {error && <p className={styles.error}>{error}</p>}
              <p className={styles.descrizione}>
                Accedendo a Colline Umbre, troverai la lista dei miei vini e potrai acquistarli direttamente online con pochi clic.
              </p>
              <button className='btn btn-primary' type="submit">Accedi</button>
            </form>
            <p>Non hai un account? <button className='btn btn-secondary' onClick={() => router.push('/register')}>Registrati</button></p>
          </div>
        ) : (
          <div className={styles.logout}>
            <h1>Ciao, {user.nome}</h1>
            <h2>Hai già effettuato l'accesso</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}