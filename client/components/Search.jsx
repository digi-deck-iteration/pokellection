    // id_in_set
    // tcgplayer_url TEXT,
    // tcgplayer_updated_at DATE,
    // tcgplayer_prices JSONB,
    // name TEXT,
    // image_url TEXT

import React, { useState } from "react";
import Card from "./Card.jsx";

const Search = (props) => {
  // const searchResults = [];
  // searchResults.map((card) => {
  //   <Card cid={card.id_in_set} cdate={card.tcgplayer_updated_at} curl={card.tcgplayer_url} cprices={card.tcgplayer_prices} cname={card.name} cimage={card.image_url}/>
  // })

  const [ searchArray, setSearchArray ] = useState([])
  
  function searchPokemon() {
    const nameToSearch = document.getElementById('searchTextInput').value;
    console.log(nameToSearch);

    fetch('/api/search', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: nameToSearch })
    })
    .then((data) => data.json())
    .then((parsed) => {
      console.log('Search Results: ', parsed);
      // setSearchArray(searchArray.concat(parsed));
    })
    .catch((err) => console.log(err))
  }

  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(<Card onClick={props.setcarouselarray}/>);
  }

  return (
      <div>
        <div className="flex gap-4 justify-center">
          <input id="searchTextInput" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <button className="btn" onClick={searchPokemon}>Search</button>
        </div>
        <div className="flex justify-center">
          {searchArray}
        </div>
      </div>
  );
}

export default Search;