    // id
    // tcgplayer_url TEXT,
    // tcgplayer_updated_at DATE,
    // tcgplayer_prices JSONB,
    // name TEXT,
    // image_url TEXT

import React, { useEffect } from "react";

const Search = (props) => {
  const [searchResults, setSearchResults ] = useState([])
  const searchResultArr = [];

  useEffect(() => {
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
        searchResultArr.push(<Card cid={card.id} cdate={card.tcgplayer_updated_at} curl={card.tcgplayer_url} cprices={card.tcgplayer_prices} cname={card.name} cimage={card.image_url}/>)
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

//fetch api data from home, so we can look for all of the different cards in the database

//create a search input and onchange it will update state where you will pass what is in the search bar and make a fetch request that is wrapped in a useeffect, we will add the state of the search value as the dependency of the useffect
//create logic where if the value is equal to the name of the card then push it to the searchresults as an array of objects, or search results from the database is an array of objects or just one object inside of an array?