    // id
    // tcgplayer_url TEXT,
    // tcgplayer_updated_at DATE,
    // tcgplayer_prices JSONB,
    // name TEXT,
    // image_url TEXT

import React from "react";

const Search = (props) => {
  const searchResults = [];
  searchResults.map((card) => {
    <Card cid={card.id} cdate={card.tcgplayer_updated_at} curl={card.tcgplayer_url} cprices={card.tcgplayer_prices} cname={card.name} cimage={card.image_url}/>
  })

  return (

  );
}

export default Search;