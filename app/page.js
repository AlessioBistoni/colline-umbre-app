"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles.container}
      >
        <div className={styles.text}>
          <h1>Benvenuti nella nostra cantina!</h1>
          <p>Qui troverete una selezione dei migliori vini umbri.</p>
        </div>
        <Image
          src="/cantina.png"
          alt="Cantina"
          layout="responsive"
          width={2000}
          height={1125}
          className={styles.imageWelcome}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 150 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: false }}
        className={styles.introduzione}
      >
        <h2 className="mx-5 h5 ">dal 1962</h2>
        <h1>Benvenuti nella Cantina Colline Umbre</h1>
        <p className="mx-5 ">
          Situata nel cuore verde d'Italia, la Cantina "Colline Umbre" è un
          gioiello nascosto tra le dolci colline umbre. Questa regione, rinomata
          per la sua bellezza naturale e la sua ricca tradizione
          enogastronomica, è il luogo ideale per la produzione di vini di alta
          qualità.
        </p>
      </motion.div>

      <Image
        src="/intro.jpg"
        alt="Intro"
        layout="responsive"
        width={2000}
        height={1125}
        className={styles.imageIntroduzione}
        
      />
<script src="script.js"></script>

      <div className={styles.presentazioneVini}>
        <h1 className="mx-5 h2"> Esplora l'Eccezionale Mondo dei Vini Umbri</h1>
        <p>
          Benvenuti nel cuore dell'Umbria, dove il paesaggio mozzafiato e il
          clima generoso si uniscono per dare vita a una tradizione vinicola
          ricca e affascinante. Scopri il nostro straordinario assortimento di
          vini, un'ode alla diversità e alla bellezza del territorio umbro.
        </p>
      </div>

      <div className={styles.vinobianco}>
        <div className={styles.imageVino}>
          <Image
            src="/bianco.jpg"
            alt="Intro"
            layout="responsive"
            width={2000}
            height={1125}
          />
        </div>

        <div>
          <h1>Vini Bianchi: La Freschezza delle Colline Umbre</h1>
          <p>
            Scopri la freschezza e l'eleganza dei nostri vini bianchi, nati tra
            le dolci colline umbre baciati dal sole. Conquistano i palati più
            raffinati con la loro vivacità e complessità aromatica. I vitigni
            autoctoni come il Grechetto e il Trebbiano Spoletino, uniti a una
            meticolosa cura in vigna e in cantina, danno vita a vini dall'animo
            giovane e dalla personalità vibrante. Dal colore paglierino
            brillante alla fragranza di fiori bianchi e frutta fresca, ogni
            sorso racconta la storia unica del nostro territorio.
          </p>
        </div>
      </div>

      <div className={styles.vinobianco}>
        <div>
        <h1>Vini Rossi: Il Cuore Appassionato dell'Umbria</h1>
        <p>
          Immergiti nell'intensità e nella profondità dei nostri vini rossi, che
          incarnano il cuore appassionato dell'Umbria. Le uve Sangiovese,
          Sagrantino e Montepulciano, coltivate con amore e rispetto per la
          tradizione, si trasformano in vini dal carattere deciso e dalla
          struttura avvolgente. Dal rubino intenso e riflessi violacei, al
          bouquet complesso di frutti rossi maturi e spezie, ogni sorso è un
          viaggio sensoriale attraverso i secoli di storia e cultura di questa
          terra generosa.
        </p>
      </div>
      <div className={styles.imageVino}>
          <Image
            src="/bianco.jpg"
            alt="Intro"
            layout="responsive"
            width={2000}
            height={1125}
          />
        </div>
      </div>
    </div>
  );
}
