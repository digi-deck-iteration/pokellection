import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Carousel = (props) => {

const cards = props.carouselarray.slice();

const carouselItems = cards.map((card) => {
  <div className="carousel-item">
    <Card carouselarray={props.carouselarray} cname={card.name} cimage={card.image_url} cid={card.id_in_set} cdate={card.tcgplayer_updated_at} curl={card.tcgplayer_url} cprices={card.tcgplayer_prices} />
  </div> 
})

return (
  <div className="m-10 carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
    {carouselItems}
    <div className="carousel-item">
      <Card cname={'card.name'} cimage="https://images.pokemontcg.io/sm9/1_hires.png" cid="1" cdate="1" curl="https://images.pokemontcg.io/sm9/1_hires.png" cprices={{holofoil: "none" }} />
    </div> 
    <div className="carousel-item">
      <Card cname={'card.name'} cimage="https://images.pokemontcg.io/sm9/1_hires.png" cid="1" cdate="1" curl="https://images.pokemontcg.io/sm9/1_hires.png" cprices={{holofoil: "none" }} />
    </div> 
    <div className="carousel-item">
      <Card cname={'card.name'} cimage="https://images.pokemontcg.io/sm9/1_hires.png" cid="1" cdate="1" curl="https://images.pokemontcg.io/sm9/1_hires.png" cprices={{holofoil: "none" }} />
    </div> 
    <div className="carousel-item">
      <Card cname={'card.name'} cimage="https://images.pokemontcg.io/sm9/1_hires.png" cid="1" cdate="1" curl="https://images.pokemontcg.io/sm9/1_hires.png" cprices={{holofoil: "none" }} />
    </div> 
  </div>
)};

export default Carousel;
//useeffect dependency that checks the state of the carousel array and if there arte more things added then it keeps adding things to the return

//empty
//create an array of the search collection where we keep track of the collection
//use a loop to render new divs as long as they havent submitted, submitted will be a true or false state, once they submit then it will refresh the page or return state to 0
//
