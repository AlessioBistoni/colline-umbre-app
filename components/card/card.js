"use client";
import React, { useState } from "react";

const Card = ({
  cardId, // Aggiungi cardId come prop
  cardTitle,
  cardPrice,
  cardAnno,
  cardTipo,
  backgroundImage,
  short_description,
  long_description,
}) => {
  const [showLongDescription, setShowLongDescription] = useState(false);

  const toggleDescription = () => {
    setShowLongDescription(!showLongDescription);
  };

  const addToCart = async () => {
    const userId = 1; // Dovresti ottenere l'ID dell'utente in qualche modo, magari dal contesto o dai props
    try {
      const response = await fetch('http://localhost:3001/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, wineId: cardId }),
      });

      if (response.ok) {
        alert(`Il vino "${cardTitle}" è stato aggiunto al carrello!`);
      } else {
        alert('Errore durante l\'aggiunta del vino al carrello.');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore durante l\'aggiunta del vino al carrello.');
    }
  };

  return (
    <div>
      <div className="col-md-20 mb-3">
        <div className="card bg-light">
          <img
            src={backgroundImage}
            className="card-img-top"
            alt="immagine di un vino"
          />

          <div className="card-body">
            <h1 className="card-title h2 mb-2">{cardTitle}</h1>
            <h2 className="card-text h4 mb-4">{cardAnno}</h2>
            {showLongDescription ? (
              <h2 className="card-text h5 mb-4">{long_description}</h2>
            ) : (
              <h2 className="card-text h5 mb-4">{short_description}</h2>
            )}
            <div className="d-flex justify-content-between align-items-center mx-1">
              <h3 className="card-title h4">{cardTipo}</h3>
              <h4 className="card-text h4">{cardPrice}€</h4>
            </div>
            <button
              className="btn btn-success mt-4"
              onClick={toggleDescription}
            >
              {showLongDescription ? "nascondi informazioni" : "informazioni"}
            </button>
            <button
              className="btn btn-primary mt-4 ml-2"
              onClick={addToCart}
            >
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
