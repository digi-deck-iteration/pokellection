import React from 'react'
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Card(props) {

    return(
    <div className="h-auto w-[300px] m-5 flex flex-col justify-center">
      <img className="p-3 btn w-auto h-auto" src="https://tcg.pokemon.com/assets/img/parents-guide/about/en-us/SM11_55.jpg"></img>
      
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
}


//creating card component: https://daisyui.com/components/card/
//to show stats like price, name, etc for cards https://daisyui.com/components/stat/
