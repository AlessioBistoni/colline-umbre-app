// pages/about.js
"use client";
import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

const About = () => {
  return (
    <div>
      <div className={styles.welcome}>
        <div>
        <h1 className="me-5 h2">Ci Presentiamo</h1>
        <p>siamo le colline umbre...</p>
        </div>
      <Image
          src="/vigneto.png"
          alt="vigneto"
          layout="responsive"
          width={2000}
          height={1125}
          className={styles.image}
        />
      </div>

      <div className={styles.storia}>

      <Image
          src="/viticoltori.jpg"
          alt="vigneto"
          layout="responsive"
          width={2000}
          height={1125}
          className={styles.image}
        />


        <div className="ms-5 ">
        <h1 className="h2">La nostra storia</h1>
        <p>
          La Cantina "Colline Umbre" è nata dalla passione della famiglia Rossi
          per la viticoltura e per il territorio umbro. Fondata nel 1980, la
          cantina è cresciuta nel corso degli anni, mantenendo sempre un forte
          legame con le tradizioni locali e un impegno costante per la qualità.
        </p>
        </div>
      </div>





      <div className={styles.territorio} >
        <h1 className="h2">Il Territorio</h1>
        <p>
          I nostri vigneti si estendono su 50 ettari di terreno collinare, a
          un'altitudine compresa tra i 300 e i 400 metri sul livello del mare.
          Questa posizione privilegiata, combinata con un clima favorevole e un
          suolo ricco di minerali, crea le condizioni ideali per la coltivazione
          di vitigni autoctoni come il Sangiovese, il Grechetto e il Sagrantino.
        </p>

        <Image
          src="/umbria.jpg"
          alt="vigneto"
          layout="responsive"
          width={2000}
          height={1125}
          className={styles.image}
        />
      </div>

      <div>
        <h1>I Nostri Vini</h1>
        <p>
          Alla Cantina "Colline Umbre" produciamo una gamma di vini che
          riflettono la diversità e la ricchezza del nostro territorio. Dai vini
          rossi corposi e strutturati ai bianchi freschi e aromatici, ogni
          bottiglia racconta la storia e la passione che mettiamo in ogni fase
          della produzione.
        </p>
      </div>
    </div>
  );
};

export default About;
