// id_in_set
// tcgplayer_url TEXT,
// tcgplayer_updated_at DATE,
// tcgplayer_prices JSONB,
// name TEXT,
// image_url TEXT

import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Search = (props) => {
  const [searchArray, setSearchArray] = useState([]);

  function searchPokemon() {
    const nameToSearch = document.getElementById('searchTextInput').value;
    // console.log(nameToSearch);

    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nameToSearch }),
    })
      .then((data) => data.json())
      .then((parsed) => {
        // console.log('Search Results: ', parsed);
        const cardsArray = parsed.map((card) => {
          // console.log(card.tcgplayer_prices.holofoil);
          if (!Object.hasOwn(card.tcgplayer_prices, 'holofoil'))
            card.tcgplayer_prices.holofoil = {
              market: 'n/a',
              high: 'n/a',
              low: 'n/a',
            };
          return (
            <Card
              addToCarousel={props.addToCarousel}
              cname={card.name}
              cimage={card.image_url}
              cid={card.id_in_set}
              cdate={card.tcgplayer_updated_at}
              curl={card.tcgplayer_url}
              cprices={card.tcgplayer_prices}
            />
          );
        });
        setSearchArray(cardsArray);
        // console.log(cardsArray);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className='flex gap-4 justify-center'>
        <input
          id='searchTextInput'
          type='text'
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs'
        />
        <button className='btn' onClick={searchPokemon}>
          Search
        </button>
      </div>
      <div className='flex flex-wrap justify-center'>
        {searchArray}
        {/* {cards} */}
      </div>
    </div>
  );
};

export default Search;
