'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Footer from '@/components/footer/footer.js';
import styles from './Layout.module.css'; 

const AdminLayout = ({ children }) => {
  const [userAdmin, setUserAdmin] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUserAdmin(user ? user.admin : null);
  }, []);



  
  return (
    <div className={styles.container}>
      <div>
        {(() => {
          if (userAdmin === 1) {
            return children;
          } else
          if (userAdmin === 0){
            return(
            <div className={styles.messaggio}> 
            <h1>Non hai accesso alla pagina</h1>;
            </div>);
          }
          else {
            return ( 
            <div className={styles.messaggio}>
            <h1>Caricamento...</h1>
            </div>
          );
          }
        })()}
      </div>
      <Footer />
    </div>
  );
  
};

export default AdminLayout;
