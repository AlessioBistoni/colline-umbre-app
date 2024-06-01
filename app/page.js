"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

export default function Home() {
  return (
    <div>
      <Parallax pages={8}>
      

          <ParallaxLayer speed={0} offset={0}>
          <div className={styles.imageWelcomeContainer}>
          <Image
            src="/cantina.png"
            alt="Cantina"
            layout="responsive"
            width={2000}
            height={1125}
            className={styles.imageWelcome}
          />
          </div>
          </ParallaxLayer>
          <ParallaxLayer speed={0.3} offset={0}>
          <div className={styles.text}>
            <h1>Benvenuti nella nostra cantina!</h1>
            <p>Qui troverete una selezione dei migliori vini umbri.</p>
          </div>
          </ParallaxLayer>

        

        {/* immagine di introduzione con la coppia a cui viene servito il vino */}
        <ParallaxLayer speed={-0.1} offset={1.85}>
          <div className={styles.imageIntroduzioneContainer}>
        <Image
          src="/intro.jpg"
          alt="Intro"
          layout="responsive"
          width={2000}
          height={1125}
          className={styles.imageIntroduzione}
        />
        </div>
        </ParallaxLayer>

        {/* scritta benvenuti della cantina colline umbre, si trova sopra all'immagine della coppia */}
        <ParallaxLayer speed={0} offset={1.5}>
        <motion.div 
        
        initial={{ opacity: 1, scale: 1, y: -200}}
        whileInView={{ opacity: 1, scale: 1, y:-200 }}
        transition={{ duration: 0.8, delay:0.2 }}
        viewport={{ once: false }}
        
        className={styles.introduzione} >
          <h2 className="mx-5 h5 ">dal 1962</h2>
          <h1>Benvenuti nella Cantina Colline Umbre</h1>
          <p className="mx-5 ">
            Situata nel cuore verde d'Italia, la Cantina "Colline Umbre" è un
            gioiello nascosto tra le dolci colline umbre. Questa regione,
            rinomata per la sua bellezza naturale e la sua ricca tradizione
            enogastronomica, è il luogo ideale per la produzione di vini di alta
            qualità.
          </p>
        </motion.div>
        </ParallaxLayer>
        

      {/* scritta esplora l'eccezionale modno dei vini umbri e sottotitolo */}
        <ParallaxLayer speed={0} offset={2.65}>
        <div className={styles.presentazioneVini}>
          <h1 className="mx-5 h2">
            {" "}
            Esplora l'Eccezionale Mondo dei Vini Umbri
          </h1>
          <p>
            Benvenuti nel cuore dell'Umbria, dove il paesaggio mozzafiato e il
            clima generoso si uniscono per dare vita a una tradizione vinicola
            ricca e affascinante. Scopri il nostro straordinario assortimento di
            vini, un'ode alla diversità e alla bellezza del territorio umbro.
          </p>
        </div>
        </ParallaxLayer>

        <ParallaxLayer speed={0} offset={3.5}>
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
              Scopri la freschezza e l'eleganza dei nostri vini bianchi, nati
              tra le dolci colline umbre baciati dal sole. Conquistano i palati
              più raffinati con la loro vivacità e complessità aromatica. I
              vitigni autoctoni come il Grechetto e il Trebbiano Spoletino,
              uniti a una meticolosa cura in vigna e in cantina, danno vita a
              vini dall'animo giovane e dalla personalità vibrante. Dal colore
              paglierino brillante alla fragranza di fiori bianchi e frutta
              fresca, ogni sorso racconta la storia unica del nostro territorio.
            </p>
          </div>
        </div>
        </ParallaxLayer>

        <ParallaxLayer speed={0} offset={4.5}>
        <div className={styles.vinobianco}>
          <div>
            <h1>Vini Rossi: Il Cuore Appassionato dell'Umbria</h1>
            <p>
              Immergiti nell'intensità e nella profondità dei nostri vini rossi,
              che incarnano il cuore appassionato dell'Umbria. Le uve
              Sangiovese, Sagrantino e Montepulciano, coltivate con amore e
              rispetto per la tradizione, si trasformano in vini dal carattere
              deciso e dalla struttura avvolgente. Dal rubino intenso e riflessi
              violacei, al bouquet complesso di frutti rossi maturi e spezie,
              ogni sorso è un viaggio sensoriale attraverso i secoli di storia e
              cultura di questa terra generosa.
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
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
