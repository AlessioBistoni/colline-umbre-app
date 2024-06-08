"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const OtherComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('user');
    window.location.href = '/prova'; // Reindirizza alla pagina di login
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Benvenuto, {user.nome}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Effettua il login per continuare.</p>
      )}
    </div>
  );
};

export default OtherComponent;
