import React from 'react';
import Card from './card';


const Column = ({ title, cards, sortingOption }) => {
  const sortedCards = sortTickets(cards, sortingOption);

  return (
    <div className="column">
      <h2>{title}</h2>
      {sortedCards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default columns;
