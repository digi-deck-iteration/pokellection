import React from 'react'
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  const market = props.cprices.holofoil.market === 'n/a' ? 'n/a' : `$${props.cprices.holofoil.market}`;
  const high = props.cprices.holofoil.high === 'n/a' ? 'n/a' : `$${props.cprices.holofoil.high}`;
  const low = props.cprices.holofoil.low === 'n/a' ? 'n/a' : `$${props.cprices.holofoil.low}`;
  const highPercent = props.cprices.holofoil.market === 'n/a' ? "n/a" : (parseInt(props.cprices.holofoil.high/props.cprices.holofoil.market * 100).toString() + "%");
  const lowPercent = props.cprices.holofoil.market === 'n/a' ? "n/a" : (parseInt(props.cprices.holofoil.low/props.cprices.holofoil.market * 100).toString() + "%");
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date.getUTCDate()).slice(-2);
    return year.toString().slice(2) + "." + month + "." + day;
  }
  let date = 'n/a';
  if (props.cdate) date = formatDate(props.cdate);

  const openInNewTab = (url) => {
    if (props.curl) url = props.curl;
    window.open(url, "_blank", "noreferrer");
  };

  return(
    <div className="h-auto w-[300px] m-5 flex flex-col justify-center">
      <img onClick={(e) => {props.setcarouselarray(props)}} className="p-3 btn w-auto h-auto" src={props.cimage}></img>
      
      <div onClick={() => openInNewTab("https://shop.tcgplayer.com/price-guide/pokemon")} className="stats shadow hover:opacity-50">

        <div className="stat">
          <div className="stat-title text-xs">Price</div>
          <div className="stat-value text-base">{market}</div>
          <div className="stat-desc text-xs">{date}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">High</div>
          <div className="stat-value text-base">{high}</div>
          <div className="stat-desc text-xs">↗︎ {highPercent}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs">Low</div>
          <div className="stat-value text-base">{low}</div>
          <div className="stat-desc text-xs">↘︎ {lowPercent}</div>
        </div>

      </div>
    </div>
  )
}


//creating card component: https://daisyui.com/components/card/
//to show stats like price, name, etc for cards https://daisyui.com/components/stat/
