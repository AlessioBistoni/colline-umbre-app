"use client";
import React, { useState } from "react";

const Card = ({
  cardTitle,
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
            <h1 className="card-title h2 mb-4">{cardTitle}</h1>
            {showLongDescription ? (
              <h2 className="card-text h5 mb-4">{long_description}</h2>
            ) : (
              <h2 className="card-text h5 mb-4">{short_description}</h2>
            )}
            <div className="d-flex justify-content-between align-items-center mx-1">
              <h3 className="card-title h4">{cardTipo}</h3>
              <h4 className="card-text h4">{cardAnno}</h4>
            </div>
            <button
              className="btn btn-success mt-4"
              onClick={toggleDescription}
            >
              {showLongDescription ? "nascondi informazioni" : "informazioni"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
