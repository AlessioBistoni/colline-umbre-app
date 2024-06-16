"use client";
import React, { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/orders');
        if (!response.ok) {
          throw new Error('Errore durante il recupero degli ordini');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Errore durante il recupero degli ordini:', error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Ordini degli Utenti</h1>
      {orders.length === 0 ? (
        <p>Nessun ordine disponibile</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id}>
              <h2>Ordine #{order.id}</h2>
              <p>Nome: {order.nome}</p>
              <p>Cognome: {order.cognome}</p>
              <p>Data dell'ordine: {order.order_date}</p>
              <p>Totale: {order.total_amount} €</p>
              <p>Email: {order.email}</p>
              <h3>Dettagli dell'ordine:</h3>
              <ul>
                {order.order_details && order.order_details.length > 0 ? (
                  order.order_details.map(detail => (
                    <li key={detail.id}>
                      {detail.quantity} x {detail.name} - Prezzo unitario: {detail.price_per_unit} €
                    </li>
                  ))
                ) : (
                  <p>Dettagli dell'ordine non disponibili</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
