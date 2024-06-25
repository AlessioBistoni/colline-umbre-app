"use client";

import AdminLayout from "./Layout/LayoutAdmin";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import DownloadMessageButton from "@/components/addToCartButton/downloadMessagesButton/downloadMessagesButton";
import DownloadOrdersButton from "@/components/downloadOrdersButton/downloadOrderButton";

const Admin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AdminLayout>
      <div className={styles.page}>
      <div className={styles.container}>
        {user ? (
          <div className={styles.informazioni}>
            <h1 className='my-3'>Benvenuto, {user.nome}!</h1>
            <h2>
              Questa pagina è visibile solo agli amministratori, da qui puoi gestire il tuo sito con facilità.
            </h2>
          </div>
        ) : (
          <h1>Caricamento...</h1>
        )}
        
        <div className={styles.sezioneSchede}>
          <div className={styles.scheda}>
            <h3>Messaggi</h3>
            <div className={styles.bottone}>
              <a href="/admin/messaggi">
                <button className="btn btn-primary">Vai alla casella</button>
              </a>
            </div>
            <div className={styles.bottone}>
              <DownloadMessageButton />
            </div>
          </div>
          
          <div className={styles.scheda}>
            <h3>Gestisci i vini</h3>
            <div className={styles.bottone}>
              <a href="/admin/addwine">
                <button className="btn btn-primary">Aggiungi Prodotto</button>
              </a>
            </div>
            <div className={styles.bottone}>
              <a href="/admin/removewine">
                <button className="btn btn-primary">Rimuovi Prodotto</button>
              </a>
            </div>
          </div>

          <div className={styles.scheda}>
            <h3>Ordini</h3>
            <div className={styles.bottone}>
              <a href="/admin/orderpage">
                <button className="btn btn-primary">Lista ordini</button>
              </a>
            </div>
            <div className={styles.bottone}>
              <DownloadOrdersButton />
            </div>
          </div>

          <div className={styles.scheda}>
            <h3>Utenti Registrati</h3>
            <div className={styles.bottone}>
              <a href="/admin/users">
                <button className="btn btn-primary">Lista Utenti</button>
              </a>
            </div>
            <div className={styles.bottone}>
              <DownloadOrdersButton />
            </div>
          </div>
        </div>

        <p className={styles.testoFinale}>
          In qualità di amministratore del sito, hai il pieno controllo sulla
          gestione e l'aggiornamento del contenuto. Puoi facilmente aggiungere
          nuovi vini al catalogo, assicurandoti che la tua offerta sia sempre
          aggiornata e attraente per i visitatori. Inoltre, hai accesso ai
          messaggi degli utenti, permettendoti di rispondere tempestivamente
          alle loro domande e di garantire un'esperienza utente ottimale. Con
          questi strumenti a tua disposizione, la gestione del sito diventa
          semplice e intuitiva, permettendoti di concentrarti sulla crescita e
          sul successo della tua attività online.
        </p>
      </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;