import React from 'react';

const Card = ({ cardTitle, cardAnno, cardTipo, backgroundImage }) => {
  return (
    <div>
      <div className="col-md-20 mb-3">
        <div className="card bg-light"> 
        <img src={backgroundImage} className="card-img-top" alt="immagine di un vino" />

          <div className="card-body">
            <h1 className="card-title h1">{cardTitle}</h1>
            
            
                <h2 className="card-title h2">{cardTipo}</h2>
                <p className="card-text h4">{cardAnno}</p>

            <a href="#" className="btn btn-success">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
