'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Footer from '@/components/footer/footer.js';
import styles from './Layout.module.css'; 

const AdminLayout = ({ children }) => {
  const [userAdmin, setUserAdmin] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUserAdmin(user ? user.admin : null);

    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 500); // Timer di 3 secondi (3000 millisecondi)

    return () => clearTimeout(timer);
  }, []);



  
  return (
    <div className={styles.container}>
      <div>
        
        {(() => {
          if (userAdmin === 1) {
            return children;
          } else {
            if (showMessage) {
              return(
              <div className={styles.messaggio}> 
            <h1>Non hai accesso alla pagina</h1>
            </div>);
              } else {
                return <div className={styles.spacer}></div>
              }
          }
        })()}
      </div>
      <Footer />
    </div>
  );
  
};

export default AdminLayout;

