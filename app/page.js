"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "@/components/footer/footer.js";

export default function Home() {
  
  return (
    <div>
      <Parallax pages={6.6}>
      <section id="sezione di apertura della pagina">
        <ParallaxLayer speed={0} offset={0}>
          <motion.div 
          initial={{ opacity: 0, scale: 1, y: 0 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: false }}
          className={styles.imageWelcomeContainer}>
            <Image
              src="/cantina.png"
              alt="Cantina"
              // layout="responsive"
              width={2000}
              height={1125}
              className={styles.imageWelcome}
            />
          </motion.div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.2} offset={0}>
          <motion.div 
          initial={{ opacity: 0, scale: 1, y: 0 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false }}
          className={styles.scrittaDiBenvenuto}>

            <h2 className={styles.benvenuto}>Benvenuti nella cantina</h2>
            <h1 className={styles.titoloDiBenvenuto}>Colline Umbre</h1>
            <h3 className={styles.sottotitoloDiBenvenuto}>Dove il vino racconta la nostra storia...</h3>

            {/* <blockquote className={styles.sottotitoloDiBenvenuto}>"Un bicchiere di vino delle Colline Umbre non è solo una bevanda, ma un'esperienza che racconta la storia della nostra terra e della nostra passione."</blockquote> */}
          </motion.div>
        </ParallaxLayer>
        </section>


        <section id="introduzione alla pagina">
        {/* scritta benvenuti della cantina colline umbre, funziona da introduzione al sito */}
        <ParallaxLayer speed={0} offset={1.45}>
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false }}
            className={styles.TestoDiIntroduzione}
          >
            <h2 className="mx-5 h5 ">dal 1962</h2>
            <h1>La Tradizione del Buon Vino</h1>
            <p className="mx-5 ">
              Situata nel cuore verde d'Italia, la Cantina "Colline Umbre" è un
              gioiello nascosto tra le dolci colline umbre. Questa regione,
              rinomata per la sua bellezza naturale e la sua ricca tradizione
              enogastronomica, è il luogo ideale per la produzione di vini di
              alta qualità.
            </p>
          </motion.div>
        </ParallaxLayer>





        {/* immagine di introduzione con la coppia a cui viene servito il vino */}
        <ParallaxLayer speed={0} offset={1.85}>
          <div className={styles.imageIntroduzioneContainer}>

          
            <Image
              src="/intro.jpg"
              alt="Intro"
              width={2000}
              height={1125}
              className={styles.imageIntroduzione}
            />

          <ParallaxLayer speed={0.1} offset={0}>
            <div className={styles.spacerstart}></div>
          </ParallaxLayer>

          <ParallaxLayer speed={0.1} offset={0.3}>
            <div className={styles.spacerend}></div>
          </ParallaxLayer>
          </div>
        </ParallaxLayer>
        </section>





        <section id="prodotti della pagina">
        {/* scritta esplora l'eccezionale mondo dei vini umbri e sottotitolo */}
        <ParallaxLayer speed={0} offset={3.1}>
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false }} 
            className={styles.presentazioneVini}>
            <h1 className="mx-5 h2">
              Esplora l'Eccezionale Mondo dei Vini Umbri
            </h1>
            <p>
              Benvenuti nel cuore dell'Umbria, dove il paesaggio mozzafiato e il
              clima generoso si uniscono per dare vita a una tradizione vinicola
              ricca e affascinante. Scopri il nostro straordinario assortimento
              di vini, un'ode alla diversità e alla bellezza del territorio
              umbro.
            </p>
          </motion.div>
        </ParallaxLayer>





        
        {/* container immagine vino bianco */}
        <ParallaxLayer speed={0} offset={3.7}>
          <div className={styles.vinoContainer}>
            <ParallaxLayer speed={-0.1} offset={-0.5}>
              <div className={styles.vinoBiancoImageContainer}>
                <div className={styles.imageVino}>
                  <Image
                    src="/bianco.png"
                    alt="Intro"
                    width={841}
                    height={2901}
                    className={styles.imageVino}
                  />
                </div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer speed={0} offset={0}>
              <div className={styles.vinoBiancoDescrizione}>
                <h1>Vini Bianchi: La Freschezza delle Colline Umbre</h1>
                <p>
                  Scopri la freschezza e l'eleganza dei nostri vini bianchi,
                  nati tra le dolci colline umbre baciati dal sole. Conquistano
                  i palati più raffinati con la loro vivacità e complessità
                  aromatica. I vitigni autoctoni come il Grechetto e il
                  Trebbiano Spoletino, uniti a una meticolosa cura in vigna e in
                  cantina, danno vita a vini dall'animo giovane e dalla
                  personalità vibrante. Dal colore paglierino brillante alla
                  fragranza di fiori bianchi e frutta fresca, ogni sorso
                  racconta la storia unica del nostro territorio.
                </p>
              </div>
            </ParallaxLayer>
          </div>
        </ParallaxLayer>



        {/* container immagine vino bianco */}
        <ParallaxLayer speed={0} offset={5}>
          <div className={styles.vinoContainer}>
            <ParallaxLayer speed={-0.1} offset={-0.7}>
              <div className={styles.vinoRossoImageContainer}>
                <div className={styles.imageVino}>
                  <Image
                    src="/rosso.png"
                    alt="Intro"
                    width={841}
                    height={2901}
                    className={styles.imageVino}
                  />
                </div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer speed={0} offset={0}>
              <div className={styles.vinoRossoDescrizione}>
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
            </ParallaxLayer>
          </div>
        </ParallaxLayer>
        </section>

        <ParallaxLayer speed={0} offset={6.1}>
        <div className={styles.footerContainer}>
        <Footer />
        </div>
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}
