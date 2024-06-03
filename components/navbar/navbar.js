import Link from 'next/link';
import styles from './Navbar.module.css'; // Importa il file CSS separato
import { motion } from "framer-motion"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/contact">Contact</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/shop">Shop</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


