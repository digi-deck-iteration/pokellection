import React, { useEffect, useState } from "react";
import Deck from "./Deck.jsx"
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";

export default function Collections() {
  const navigate = useNavigate();
  const [ collection, setCollection ] = useState([]);

  const goToDeck = (e) => {
    const deckId = e.target.attributes.deckid.value;
    console.log(deckId);
    navigate(`/deck/?deck_id=${deckId}`);
  };  

  // Check if logged in
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

  // Fetch user decks
  useEffect(() => {
    fetch('/api/collection')
    .then((data) => data.json())
    .then((parsed) => {
      const mappedDecks = parsed.map((deck) => {
        return (
          <div className="h-auto w-[300px]">
            <img onClick={goToDeck} deckid={deck.deck_id} className="p-3 btn w-auto h-auto" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_759,h_1053/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"></img>
            <div className="flex justify-center">{deck.deck_id}</div>
            <div className="stats shadow">
        
              <div className="stat">
                <div className="stat-title text-xs">Price</div>
                <div className="stat-value text-base">$5.00</div>
                <div className="stat-desc text-xs">Jan 1st</div>
              </div>
    
              <div className="stat">
                <div className="stat-title text-xs">High</div>
                <div className="stat-value text-base">$6.00</div>
                <div className="stat-desc text-xs">↗︎ 20%</div>
              </div>
    
              <div className="stat">
                <div className="stat-title text-xs">Low</div>
                <div className="stat-value text-base">$4.00</div>
                <div className="stat-desc text-xs">↘︎ 20%</div>
              </div>
    
            </div>
          </div>
        )
      });

      setCollection(mappedDecks);
    })
    .catch((err) => {
      console.log(err);
      window.alert('Could not get decks');
    });
  }, []);

  return (
    <div>
      <Nav />
      <div className="flex flex-wrap gap-4 justify-center">
        {collection}
      </div>
    </div>
  );
}