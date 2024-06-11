"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card/card"; // Assicurati che il percorso sia corretto

import styles from "./shop.module.css";
import Cookies from "js-cookie";
import Footer from "@/components/footer/footer.js";

const ShopPage = () => {
  const [wines, setWines] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

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

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("user");
    window.location.href = "/shop"; // Reindirizza alla pagina di login
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {user ? (
        <div>

          <div className={styles.userContainer}>
          <div className={styles.user}>
            <h1>Benvenuto, {user.nome}!</h1>
            <a href="/carrello" >
              <button href="/carrello" className="btn btn-primary m-2">Carrello</button>
            </a>
            <button onClick={handleLogout} className="btn btn-primary m-2">Logout</button>
          </div>
          </div>

          <div className={styles.vini}>
            <h1 className="text-center">i nostri vini</h1>

            <div className="container">
              <div className="row">
                {wines.map((wine) => (
                  <div key={wine.id} className="col-md-4">
                    <Card
                      cardId={wine.id}
                      userId={user.id}
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
      ) : (
        <div className={styles.loginContainer}>
          <div className={styles.login}>
            <h1>Benvenuto nello Shop!</h1>
            <h2>Effettua il login per continuare</h2>
            <a href="/login" className={styles.menuItem}>
              <button className="btn btn-primary">Accedi</button>
            </a>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ShopPage;
