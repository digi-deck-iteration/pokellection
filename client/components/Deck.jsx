import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card.jsx'
import Nav from './Nav.jsx';

export default function Deck(props) {
  const [ cardsArray, setCardsArray ] = useState([]);
  const [ totalValue, setTotalValue ] = useState(0);
  const location = useLocation();
  const deckId = new URLSearchParams(location.search).get('deckid');
  console.log("DeckID: ", deckId);

  useEffect(() => {
    fetch('/api/isloggedin')
    .then((data) => data.json())
    .then((parsed) => {
      console.log(parsed)
      if (!parsed.authenticated) {
        window.alert('You are not logged in!');
        navigate('/login');
      };
    })
    .catch((err) => {
      console.log(err);
      window.alert('Could not veryify login!');
      navigate('/login'); 
    });
  }, []);
  
  // Get all cards for deck
  useEffect(() => {

    fetch('/api/collections/deck', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ deckId })
    })
    .then((data) => data.json())
    .then((parsed) => {
      let total = 0;
      console.log('Search Results: ', parsed);
      const cardsArray = parsed.map((card) => {
        console.log(card.tcgplayer_prices.holofoil);
        if (!Object.hasOwn(card.tcgplayer_prices, 'holofoil')) card.tcgplayer_prices.holofoil = { market: 'n/a', high: 'n/a', low: 'n/a' };
        if (typeof card.tcgplayer_prices.holofoil.market === 'number') total += card.tcgplayer_prices.holofoil.market;
        return <Card setcarouselarray={props.setcarouselarray} cname={card.name} cimage={card.image_url} cid={card.id_in_set} cdate={card.tcgplayer_updated_at} curl={card.tcgplayer_url} cprices={card.tcgplayer_prices} />
      });
      setTotalValue(total);
      setCardsArray(cardsArray);
    })
    .catch((err) => console.log(err))

  }, []);


  return (
    <div>
      <Nav />
      <div className="flex justify-center font-extrabold text-3xl">Total Value: ${totalValue}</div>
      <div className="flex flex-wrap gap-4 justify-center">
        {cardsArray}
      </div>
    </div>
  );
}