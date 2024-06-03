import React from 'react';
import Card from '@/components/card/card'; // Assicurati che il percorso sia corretto

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <Card cardTitle="Card 1" cardText="Description for Card 1" />
      </div>
      <div className="col-md-4">
        <Card cardTitle="Card 2" cardText="Description for Card 2" />
      </div>
      <div className="col-md-4">
        <Card cardTitle="Card 3" cardText="Description for Card 3" />
      </div>
    </div>
  );
};

export default HomePage;
