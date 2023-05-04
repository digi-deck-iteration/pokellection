import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const Search = (props) => {
  const [searchResults, setSearchResults ] = useState([])
  const searchResultArr = []; useEffect(() => {
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
    .then((data) => data.json())
    .then((cardArrOfObj) => {
      cardArrOfObj.map((card) => {
        searchResultArr.push(<Card cid={card.id_in_state} cdate={card.tcgplayer_updated_at} curl={card.tcgplayer_url} cprices={card.tcgplayer_prices} cname={card.name} cimage={card.image_url}/>)
      })
    })
    .catch((err) => {
      console.log(err);
      window.alert('Search error');
    });
  }, [searchResultArr]);
  const searchHandler = () => {
    setSearchResults(searchResultArr)
  }
  return (
    <div>
  <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Search Pokemon</span>
  </label>
  <input onSubmit={searchHandler} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</div>
<div className="flex flex-wrap gap-4 justify-center">
        {searchResultArr}
      </div>
</div>
  )
};
export default Search;