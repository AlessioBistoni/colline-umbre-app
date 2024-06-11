// pages/about.js
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./about.module.css";
import Footer from "@/components/footer/footer.js";

const About = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: 0 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: false }}
        className={styles.welcomeContainer}
      >
        <div className={styles.welcomeText}>
          <h1 className="h1">Ci Presentiamo</h1>
          <p>
            La Cantina Colline Umbre è situata nel cuore dell'Umbria, una
            regione rinomata per le sue colline ondulate e la tradizione
            vinicola secolare. Qui, la nostra missione è produrre vini di alta
            qualità che rispecchino l'essenza del nostro territorio e la
            passione per la viticoltura.
          </p>
        </div>
        <div className={styles.imageWelcomeContainer}>
          <Image
            src="/vigneto.jpg"
            alt="vigneto"

            width={2000}
            height={1125}
            className={styles.imageWelcome}
          />
        </div>
      </motion.div>

      {/* 


      storia


    */}
      <motion.div
        initial={{ opacity: 0, scale: 1, y: 0 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: false }}
        className={styles.storiaContainer}
      >
        <div className={styles.imageStoriaContainer}>
          <Image
            src="/viticoltori.jpg"
            alt="viticoltori"

            width={2000}
            height={1125}
            className={styles.imageStoria}
          />
        </div>
        <div className={styles.storiaText}>
          <h1 className="m-3 h1">La nostra storia</h1>
          <p>
            La Cantina "Colline Umbre" è nata dalla passione della famiglia
            Rossi per la viticoltura e per il territorio umbro. Fondata nel
            1980, la cantina è cresciuta nel corso degli anni, mantenendo sempre
            un forte legame con le tradizioni locali e un impegno costante per
            la qualità.
          </p>
        </div>
      </motion.div>

      

      <motion.div 
      initial={{ opacity: 0, scale: 1, y: 0 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: false }}
      className={styles.metodoContainer}>
      <h1 className="text-center">Colline Umbre, il nostro metodo</h1>
        <ul className={styles.listaMetodo}>
            <li>
                <h2 className="mb-5">Scopri il Metodo Naturale di Colline Umbre</h2>
                <p className="mb-5 ">
                    Nel cuore dell'Umbria, la nostra cantina Colline Umbre si distingue per l'impegno nella produzione di vini naturali. Il nostro metodo di vinificazione rispetta l'ambiente e valorizza le tradizioni locali, senza l'uso di sostanze chimiche. Utilizziamo solo uve selezionate e fermentazioni spontanee, per offrire vini autentici, dal carattere unico e inconfondibile.
                </p>
            </li>
            <li>
                <h2 className="mb-5 ">La Qualità Certificata di Colline Umbre</h2>
                <p className="mb-5 ">
                    La nostra passione per la qualità si riflette nelle numerose certificazioni che abbiamo ottenuto. Colline Umbre è orgogliosa di produrre vini a Denominazione di Origine Controllata (DOC) e Denominazione di Origine Protetta (DOP), a garanzia della nostra eccellenza e del nostro legame con il territorio. Queste certificazioni sono sinonimo di un controllo rigoroso della filiera produttiva, dalla vigna alla bottiglia.
                </p>
            </li>
            <li>
                <h2 className="mb-5 ">Un Percorso di Sostenibilità</h2>
                <p className="mb-5 ">
                    Per noi di Colline Umbre, la sostenibilità è una scelta consapevole e quotidiana. Utilizziamo tecniche agricole che rispettano la biodiversità e il ciclo naturale della vite, senza forzature. Le nostre vigne sono curate con attenzione e amore, seguendo i principi dell'agricoltura biologica e biodinamica, per un impatto minimo sull'ecosistema locale.
                </p>
            </li>
            <li>
                <h2 className="mb-5 ">La Tradizione che Incontra l’Innovazione</h2>
                <p className="mb-5 ">
                    Sebbene il nostro approccio sia profondamente radicato nelle tradizioni vinicole umbre, non rinunciamo all'innovazione. Investiamo costantemente in ricerca e sviluppo per migliorare i nostri processi produttivi e per garantire la massima qualità dei nostri vini. Il risultato è un perfetto equilibrio tra passato e futuro, tra artigianalità e tecnologia.
                </p>
            </li>
            <li>
                <h2 className="mb-5 ">Un Gusto che Racconta il Territorio</h2>
                <p className="mb-5 ">
                    Ogni bottiglia di Colline Umbre racchiude l'essenza del nostro territorio. I nostri vini sono l'espressione più pura delle colline umbre, con le loro caratteristiche uniche e il loro microclima speciale. Degustare un nostro vino significa intraprendere un viaggio sensoriale attraverso i sapori e i profumi della nostra terra.
                </p>
            </li>
            <li>
                <h2 className="mb-5 ">Esperienze Enoturistiche a Colline Umbre</h2>
                <p className="mb-5 ">
                    Vieni a scoprire la magia delle nostre vigne e della nostra cantina attraverso le nostre esperienze enoturistiche. Offriamo visite guidate, degustazioni e percorsi enogastronomici che ti permetteranno di immergerti nel nostro mondo, conoscere da vicino il nostro metodo naturale e apprezzare la qualità dei nostri vini certificati DOC e DOP.
                </p>
            </li>
            <li>
                <h2 className="mb-5 ">Impegno per la Comunità Locale</h2>
                <p className="mb-5 ">
                    Oltre a produrre vini di alta qualità, Colline Umbre è profondamente impegnata nel sostenere la comunità locale. Collaboriamo con agricoltori e artigiani del territorio, promuovendo uno sviluppo sostenibile e contribuendo alla valorizzazione delle risorse locali. La nostra cantina è un punto di riferimento per chi desidera scoprire il meglio dell'Umbria autentica.
                </p>
            </li>

        </ul>
      </motion.div>


      <motion.div
      initial={{ opacity: 0, scale: 1, y: 0 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: false }}
      className={styles.territorioContainer}>
        <h1 className="mb-3">Il Territorio</h1>
        <p>
          I nostri vigneti si estendono su 50 ettari di terreno collinare, a
          un'altitudine compresa tra i 300 e i 400 metri sul livello del mare.
          Questa posizione privilegiata, combinata con un clima favorevole e un
          suolo ricco di minerali, crea le condizioni ideali per la coltivazione
          di vitigni autoctoni come il Sangiovese, il Grechetto e il Sagrantino.
        </p>


        <Image
          src="/umbria.png"
          alt="mappa umbria"
          width={2000}
          height={1125}
          className={styles.imageIlTerritorio}
        />
      </motion.div>

      

      <Footer />
    </div>
  );
};

export default About;
