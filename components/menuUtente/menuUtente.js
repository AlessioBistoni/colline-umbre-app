import { useState } from 'react';
import styles from './MenuUtente.module.css';

const MenuUtente = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <button onClick={toggleMenu} className={styles.menuButton}>
        Menu Utente
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <a href="#link1" className={styles.menuItem}>Link 1</a>
          <a href="#link2" className={styles.menuItem}>Link 2</a>
          <a href="#link3" className={styles.menuItem}>Link 3</a>
        </div>
      )}
    </div>
  );
};

export default MenuUtente;
