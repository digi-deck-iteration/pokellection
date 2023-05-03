import React from "react";
import Deck from "./Deck.jsx"
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";

export default function Collections() {
  const navigate = useNavigate();

  const goToDeck = (e) => {
    console.log(e.target.attributes.decknumber.value);
    navigate('/deck');
  };

 

  const deckNumbers = [];
  for (let i = 0; i < 20; i++) {
    deckNumbers.push(`Deck #${i + 1}`);
  }
  const decks = deckNumbers.map((number) => {
    return (
      <div className="h-auto w-[300px]">
        <img decknumber={number} className="p-3 btn w-auto h-auto" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_759,h_1053/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA" onClick={goToDeck}></img>
        <div className="flex justify-center">{number}</div>
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
  })

  return (
    <div>
      <Nav />
      <div className="flex flex-wrap gap-4 justify-center">
        {decks}
      </div>
    </div>
  );
}