"use client";

import AdminLayout from "./Layout/LayoutAdmin";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import DownloadCsvButton from "@/components/addToCartButton/downloadMessagesButton/downloadMessagesButton";

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
      <div className={styles.container}>
        {user ? (
          <div className={styles.informazioni}>
            <h1 className="mb-5">Benvenuto, {user.nome}!</h1>
            <h2 className="mb-5">
              Questa pagina è visibile solo agli amministratori
            </h2>
            <h3 className="m-5">
              da qui puoi gestire il Tuo Sito con Facilità: Aggiungi Vini e
              Controlla i Messaggi degli Utenti
            </h3>
          </div>
        ) : (
          <h1>Caricamento...</h1>
        )}
        
        <div className={styles.sezioneSchede}>
          <div className={styles.scheda}>
            <h3>Controlla i Messaggi</h3>
            <div className={styles.bottone}>
              <a href="/admin/messaggi">
                <button className="btn btn-primary">Vai alla casella</button>
              </a>
             
            </div>
            <div className={styles.bottone}>
            <DownloadCsvButton></DownloadCsvButton>


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
    </AdminLayout>
  );
};

export default Admin;
