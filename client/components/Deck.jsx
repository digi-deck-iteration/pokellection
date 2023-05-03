import React from 'react';
import Card from './Card.jsx'
import Nav from './Nav.jsx';

export default function Deck(props) {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(<Card />);
  }
  
  return (
    <div>
      <Nav />
      <div className="flex flex-wrap gap-4 justify-center">
        {cards}
      </div>
    </div>
  );
}