import React from 'react'
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CardSmall(props) {
// <Card cid={card.id_in_set} 
// cdate={card.tcgplayer_updated_at} 
// curl={card.tcgplayer_url} 
// cprices={card.tcgplayer_prices} 
// cname={card.name} 
// cimage={card.image_url}/>
// tcgplayer_prices.holofoil.market high low


  return(
    <div className="h-auto w-[200px] m-0 flex flex-col justify-center">
      <img onClick={() => {props.removefromcarousel(props.cid)}} className="p-3 btn w-auto h-auto" src={props.cimage}></img>
    </div>
  )
}


//creating card component: https://daisyui.com/components/card/
//to show stats like price, name, etc for cards https://daisyui.com/components/stat/
