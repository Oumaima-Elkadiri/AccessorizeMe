import React, { useState } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 18rem;
  margin: 30px 20px;
  border-radius: 12px;
  overflow: hidden;
  background: #FFA17F; 
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .card-body {
    padding: 20px;
    text-align: center;
    background: #FF9E80; 

    .card-title {
      font-size: 1.5rem;
      color: #7B4397; 
      margin-bottom: 10px;
      font-weight: 400;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .card-text {
      font-size: 1.1rem;
      font-weight: bold;
      color: #fff; 
      margin-bottom: 15px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .quantity {
      margin: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      label {
        font-size: 1rem;
        color: #7B4397;
        font-weight: bold;
      }

      input {
        width: 60px;
        padding: 10px;
        font-size: 1rem;
        text-align: center;
        border: 2px solid #7B4397;
        border-radius: 25px;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus {
          border-color: #FF9E80;
          box-shadow: 0 0 5px rgba(255, 165, 127, 0.5);
        }
      }
    }

    .btn {
      background-color: #7B4397; 
      color: #fff;
      border: none;
      border-radius: 25px;
      padding: 10px 20px;
      font-size: 1rem;
      font-weight: bold;
      transition: background-color 0.3s, transform 0.3s;
      cursor: pointer;

      &:hover {
        background-color: #FF9E80; 
        color: #7B4397; 
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
`;

function Card({ id, img, titre, prix }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  function ajouterPanier(id, quantite){
    let panier = JSON.parse(localStorage.getItem('panier')) || []
    
    let exist = panier.find(produit=> produit.id === id)
    
    if(exist){
      exist.quantite += Number(quantite)
      alert("La quantité du produit a été mise à jour dans le panier !");
    }else{
      quantite = Number(quantite)
      panier.push({id, quantite})
      alert("Le produit a bien été ajouté au panier !")
    }
    
    localStorage.setItem('panier', JSON.stringify(panier))
    window.dispatchEvent(new Event("storage"));
  }
  return (
    <StyledCard className="card">
      <img src={img} className="card-img-top" alt={titre} />
      <div className="card-body">
        <h5 className="card-title">{titre}</h5>
        <p className="card-text">{prix} Dhs</p>

        {/* Section pour la quantité */}
        <div className="quantity">
          <label>Quantité :</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <button className="btn" onClick={()=>ajouterPanier(id, quantity)}>Add to cart</button>
      </div>
    </StyledCard>
  );
}

export default Card;
