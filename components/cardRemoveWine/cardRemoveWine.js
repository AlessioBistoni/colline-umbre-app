import React, { useState } from "react";
import RemoveWineButton from "@/components/removeWineButton/removeWineButton";
import Image from "next/image";
import styles from "./CardRemoveWine.module.css";

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
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
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
      <div className="col-md-20 mb-5">
        <div className="card bg-light">
          <div onClick={toggleDescription}>
            <div className={styles["square-image-wrapper"]}>
              {" "}
              {/* Usa la classe importata dal CSS */}
              <Image
                src={backgroundImage}
                alt="immagine di un vino"
                layout="fill"
                objectFit="cover"
                priority={true}
                className="card-img-top"
              />
            </div>

            <div className="card-body">
              <div className={styles.titleContainer}>
              <h1 className="card-title h2">{cardTitle}</h1>
              </div>

              <h2 className="card-text h6">{cardTipo}</h2>
              <h2 className="card-text h6 mb-4">{cardAnno}</h2>

              {showLongDescription ? (
                <div className={styles.testoLungoContainer}>
                  <h2 className={styles.testolungo}>{long_description}</h2>
                
                </div>
              ) : (
                <div className={styles.testoCortoContainer}>
                <h2 className={styles.testocorto}>{short_description}</h2>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mx-3 mb-3">
            <h2 className="card-text h4">{cardPrice}€</h2>
            <RemoveWineButton userId={userId} wineId={cardId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
