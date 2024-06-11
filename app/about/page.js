// pages/about.js
"use client";
import React from "react";
import Image from "next/image";
import styles from "./about.module.css";
import Footer from "@/components/footer/footer.js";

const About = () => {
  return (
    <div>
      <div className={styles.welcomeContainer}>
          <div className={styles.welcomeText}>
            <h1 className="h1">Ci Presentiamo</h1>
            <p>La Cantina Colline Umbre è situata nel cuore dell'Umbria, una regione rinomata per le sue colline ondulate e la tradizione vinicola secolare. Qui, la nostra missione è produrre vini di alta qualità che rispecchino l'essenza del nostro territorio e la passione per la viticoltura.</p>
          </div>
        <div className={styles.imageWelcomeContainer}>
          <Image
            src="/vigneto.jpg"
            alt="vigneto"
            layout="responsive"
            width={2000}
            height={1125}
            className={styles.imageWelcome}
          />
        </div>
      </div>

      {/* 


      storia


    */}
      <div className={styles.storiaContainer}>
        <div className={styles.imageStoriaContainer}>
          <Image
            src="/viticoltori.jpg"
            alt="vigneto"
            layout="responsive"
            width={2000}
            height={1125}
            className={styles.imageStoria}
          />
        </div>
          <div className={styles.storiaText}>
            <h1 className="m-3 h1">La nostra storia</h1>
            <p>La Cantina "Colline Umbre" è nata dalla passione della famiglia
            Rossi per la viticoltura e per il territorio umbro. Fondata nel
            1980, la cantina è cresciuta nel corso degli anni, mantenendo sempre
            un forte legame con le tradizioni locali e un impegno costante per
            la qualità.</p>
          </div>

      </div>


      <div className={styles.territorioContainer}>
        <h1 className="h1 m-3">Il Territorio</h1>
        <p>
          I nostri vigneti si estendono su 50 ettari di terreno collinare, a
          un'altitudine compresa tra i 300 e i 400 metri sul livello del mare.
          Questa posizione privilegiata, combinata con un clima favorevole e un
          suolo ricco di minerali, crea le condizioni ideali per la coltivazione
          di vitigni autoctoni come il Sangiovese, il Grechetto e il Sagrantino.
        </p>



      <div className={styles.imageIlTerritorioContainer}></div>
        <Image
          src="/umbria.png"
          alt="vigneto"
          layout="responsive"
          width={2000}
          height={1125}
          className={styles.imageIlTerritorio}
        />
      </div>

      <div className={styles.territorioContainer}>
        <h1 className="mb-5">il nostro metodo</h1>
        <h2>Agricoltura Biologica</h2>
        <p>Coltiviamo le nostre viti senza l'uso di pesticidi chimici o fertilizzanti sintetici. Crediamo nella biodiversità e nel mantenimento dell'ecosistema naturale.</p>
        <h2>Sostenibilità</h2>
        <p>Utilizziamo tecniche di agricoltura sostenibile per preservare la fertilità del suolo e ridurre l'impatto ambientale. Compostiamo i residui vegetali e minimizziamo l'uso dell'acqua attraverso pratiche di irrigazione efficienti.</p>
        
      </div>

      <Footer />
    </div>
  );
};

export default About;
