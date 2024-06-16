// components/Footer.js

import React from "react";

import Image from "next/image";
import logo from "@/public/logoBianco.png";

import styles from "./Footer.module.css"; // Importa il file CSS separato

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-white">
            <h5 className="text-white">Luogo</h5>
            <p className="text-white">
              Via Luigi Vanvitelli, 1<br />
              06123 - Perugia (PG)
              <br />
              Aperto ogni giorno
              <br />
              <strong>Solo su appuntamento</strong>
            </p>
          </div>
          <div className="col-md-4">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              className={styles["footer-logo"]}
            />
          </div>
          <div className="col-md-4">
            <h5 className="text-white" >Contatti</h5>
            <p className="text-white">
              Tel:
              <a href="tel:123 4567890" className="text-white">
                123 4567890
              </a>
            </p>
            <p className="text-white">
              Mail:{" "}
              <a href="info@collineumbre.it" className="text-white">
                info@collineumbre.it
              </a>
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p className="text-white">
              &copy; Copyright 2024 CollineUmbre |{" "}
              <a href="/" className="text-white">
                Home
              </a>{" "}
              |{" "}
              <a href="/about" className="text-white">
                About
              </a>{" "}
              |{" "}
              <a href="/contact" className="text-white">
                Contact
              </a>{" "}
              |{" "}
              <a href="/shop" className="text-white">
                Shop
              </a>{" "}
              |{" "}
              <a href="/login" className="text-white">
                Login
              </a>{" "}
              |{" "}

            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
