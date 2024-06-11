"use client";
import React, { useState } from "react";
import AddToCartButton from "@/components/addToCartButton/addToCartButton"; // Assicurati che il percorso sia corretto
import Image from "next/image";

const Card = ({
  cardId,
  cardTitle,
  cardPrice,
  cardAnno,
  cardTipo,
  backgroundImage,
  short_description,
  long_description,
  userId,
}) => {
  const [showLongDescription, setShowLongDescription] = useState(false);

  const toggleDescription = () => {
    setShowLongDescription(!showLongDescription);
  };

  const CardStyles = {
    transition: "transform 0.3s ease",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)", // Opacità del colore dell'ombra aumentata a 0.3
    borderRadius: "10px", // Bordo arrotondato
  };

  const CardHoverStyles = {
    transform: "scale(1.05)",
  };

  return (
    <div
      style={CardStyles}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = CardHoverStyles.transform)
      }
      onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
    >
      <div className="col-md-20 mb-3">
        <div className="card bg-light">
          <div onClick={toggleDescription}>
            <Image
              src={backgroundImage}
              alt="immagine di un vino"
              width={1024}
              height={1024}
              priority={true}
              className="card-img-top w-100 h-50"
            />

            <div className="card-body">
              <h1 className="card-title h2 mb-4">{cardTitle}</h1>

              <h2 className="card-text h6">{cardTipo}</h2>
              <h2 className="card-text h6 mb-4">{cardAnno}</h2>

              {showLongDescription ? (
                <h2 className="card-text h5 mb-4">{long_description}</h2>
              ) : (
                <h2 className="card-text h5 mb-4">{short_description}</h2>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mx-3 mb-3">
            <h2 className="card-text h4">{cardPrice}€</h2>
            <AddToCartButton userId={userId} wineId={cardId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
