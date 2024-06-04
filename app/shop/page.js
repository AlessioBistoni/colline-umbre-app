"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card/card"; // Assicurati che il percorso sia corretto
import styles from "./shop.module.css";

const ShopPage = () => {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/wines")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWines(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className="text-center">i nostri vini</h1>

      <div className="container">
        <div className="row">
          {wines.map((wine) => (
            <div key={wine.id} className="col-md-4">
              <Card cardTitle={wine.name} cardAnno={wine.year}  cardTipo={wine.type} backgroundImage={wine.image} short_description={wine.short_description} long_description={wine.long_description}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
