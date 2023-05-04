import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";
import Carousel from "./Carousel.jsx";
import Search from "./Search.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [ carouselArray, setCarouselArray ] = useState([]);

  function addToCarousel(newProperties) {
    console.log(carouselArray)
    setCarouselArray([...carouselArray, newProperties]);
  }

  function removeFromCarousel(cid) {
    const modifiedArray = [];
    for (let i = 0; i < carouselArray.length; i++) {
      if (cid === carouselArray[i].id_in_set) continue;
      modifiedArray.push(carouselArray[i]);
    }
    setCarouselArray(modifiedArray);
  }
  
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

  return (
    <div>
      <Nav />
      {/* <Search searchResults={searchResults} setSearchResults={setSearchResults}/> */}
      <div className="flex justify-center">
        <Carousel carouselarray={carouselArray} removefromcarousel={removeFromCarousel}/>
      </div>
      <Search setcarouselarray={addToCarousel}/>
    </div>
  )
}


