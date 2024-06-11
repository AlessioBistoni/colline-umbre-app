"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className={styles.barraContainer}>

        <div className={styles.barraPiccola} >
          
          <button className={styles.bottoneMenu} onClick={toggleDropdown}>
            Menu
          </button>
          <div
            className={`${styles.Menu} ${
              dropdownVisible ? styles.show : ""
            }`}
          >
            <li className="nav-item ">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/shop" className="nav-link">
                Shop
              </Link>
            </li>
          </div>
        </div>



        {/* <div className={styles.barraContainer}> */}
          <ul className={styles.barra}>
            <div className={styles.logoImageContainer}>
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                priority={true}
                className={styles.imageLogo}
              />
            </div>
            <li className="nav-item px-3">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link href="/shop" className="nav-link">
                Shop
              </Link>
            </li>
          </ul>

      {/* </div> */}
    </nav>
  );
};

export default Navbar;
