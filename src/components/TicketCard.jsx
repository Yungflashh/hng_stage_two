import React from 'react';
import "../styles/TicketCard.css";

const TicketCard = ({ ticketTitle, Qty, price, isSelected, onClick }) => {
  return (
    <div
      className={`ticket-card-container ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <div>
        <h2>{ticketTitle}</h2>
        <p>{Qty}</p>
      </div>
      <p id='price-tag'>{price}</p>
    </div>
  );
};

export default TicketCard;
