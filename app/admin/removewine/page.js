// RemoveWinePage.js
'use client'

import React, { useEffect, useState } from 'react';
import CardRemoveWine from "@/components/cardRemoveWine/cardRemoveWine"; // Assicurati che il percorso sia corretto
import styles from "./removewine.module.css"; // Importa lo stile CSS per la pagina
import AdminLayout from '../Layout/LayoutAdmin';    // Importa il layout per la pagina  


const RemoveWinePage = () => {
    const [wines, setWines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWines();
    }, []);

    const fetchWines = async () => {
        try {
            const response = await fetch('/api/wines');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWines(data);
        } catch (error) {
            console.error('Errore durante il recupero dei vini:', error);
            setError(error);
        }
    };



    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <AdminLayout>
        <div className={styles.container}>
            <div className={styles.vini}>

                <div className="container">
                <div className={styles.messaggio}>
                <h1 className="text-center">Attenzione</h1>
                <h2 className="text-center">Da questa pagina amministrativa è possibile rimuovere vini dal sito. I vini rimossi non saranno più visibili agli utenti. Si prega di procedere con cautela.</h2>
                </div>
                <h1 className="text-center">Lista Vini</h1>

                    <div className="row">
                        {wines.map((wine) => (
                            <div key={wine.id} className="col-md-4">
                                <CardRemoveWine
                                    cardId={wine.id}
                                    cardTitle={wine.name}
                                    cardPrice={wine.price}
                                    cardAnno={wine.year}
                                    cardTipo={wine.type}
                                    backgroundImage={wine.image}
                                    short_description={wine.short_description}
                                    long_description={wine.long_description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </AdminLayout>
    );
};

export default RemoveWinePage;
