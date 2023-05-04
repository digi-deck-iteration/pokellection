import React from 'react'
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  const market = props.cprices.holofoil.market === 'no data' ? 'n/a' : `$${props.cprices.holofoil.market}`;
  const high = props.cprices.holofoil.high === 'no data' ? 'n/a' : `$${props.cprices.holofoil.high}`;
  const low = props.cprices.holofoil.low === 'no data' ? 'n/a' : `$${props.cprices.holofoil.low}`;
  const highPercent = parseInt(props.cprices.holofoil.high/props.cprices.holofoil.market * 100).toString();
  const lowPercent = parseInt(props.cprices.holofoil.low/props.cprices.holofoil.market * 100).toString();

// <Card cid={card.id_in_set} 
// cdate={card.tcgplayer_updated_at} 
// curl={card.tcgplayer_url} 
// cprices={card.tcgplayer_prices} 
// cname={card.name} 
// cimage={card.image_url}/>
// tcgplayer_prices.holofoil.market high low

  const openInNewTab = (url) => {
    if (props.curl) url = props.curl;
    window.open(url, "_blank", "noreferrer");
  };

  // setcarouselarray={props.setcarouselarray} carouselarray={props.carouselarray}


  return(
    <div className="h-auto w-[300px] m-5 flex flex-col justify-center">
      <img onClick={() => {props.setcarouselarray(props)}} className="p-3 btn w-auto h-auto" src={props.cimage}></img>
      
      <div onClick={() => openInNewTab("https://shop.tcgplayer.com/price-guide/pokemon")} className="stats shadow hover:opacity-50">

        <div className="stat">
          <div className="stat-title text-xs">Price</div>
          <div className="stat-value text-base">{market}</div>
          <div className="stat-desc text-xs">Jan 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">High</div>
          <div className="stat-value text-base">{high}</div>
          <div className="stat-desc text-xs">↗︎ {highPercent}%</div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Low</div>
          <div className="stat-value text-base">{low}</div>
          <div className="stat-desc text-xs">↘︎ {lowPercent}%</div>
        </div>

      </div>
    </div>
  )
}


//creating card component: https://daisyui.com/components/card/
//to show stats like price, name, etc for cards https://daisyui.com/components/stat/
