'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./register.module.css";
import Footer from "@/components/footer/footer.js";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !nome || !cognome) {
      setError('Per favore, compila tutti i campi');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nome, cognome }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Registrazione riuscita:', data);
        setSuccess('Registrazione completata con successo. Ora puoi accedere.');
        setError('');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        console.log('Errore durante la registrazione:', data.message);
        setError(data.message || 'Errore durante la registrazione');
        setSuccess('');
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      setError('Errore durante la registrazione, per favore riprova più tardi');
      setSuccess('');
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.registrati}>
          <h1>Registrati</h1>
          <div className={styles.campi}>
            <form onSubmit={handleRegister}>
              <div className={styles.field}>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="cognome">Cognome:</label>
                <input
                  type="text"
                  id="cognome"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
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
              {success && <p className={styles.success}>{success}</p>}
              <button className='btn btn-primary' type="submit">Registrati</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}