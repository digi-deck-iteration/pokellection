import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav.jsx';
import Carousel from './Carousel.jsx';
import Search from './Search.jsx';
import DropDown from './DropDown.jsx';

export default function Home() {
  const navigate = useNavigate();
  const [currentDeck, setCurrentDeck] = useState(['test1']);
  const [carouselArray, setCarouselArray] = useState([]);

  function addToCarousel(newProperties) {
    setCarouselArray((curr) => [...curr, newProperties]);
  }

  function removeFromCarousel(cid) {
    const modifiedArray = [];
    for (let i = 0; i < carouselArray.length; i++) {
      if (cid === carouselArray[i].id_in_set) continue;
      else modifiedArray.push(carouselArray[i]);
    }
    setCarouselArray(modifiedArray);
  }

  const addToCollectionHandler = (array) => {
    console.log(array);
    const pokeIDs = array.map((pokimon) => pokimon.cid);

    fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name: 'name', array: pokeIDs }),
    }).then();
  };

  useEffect(() => {
    fetch('/api/isloggedin')
      .then((data) => data.json())
      .then((parsed) => {
        // console.log(parsed)
        if (!parsed.authenticated) {
          window.alert('You are not logged in!');
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
        // window.alert('Could not veryify login!');
        navigate('/login');
      });
  }, []);

  return (
    <div className='flex flex-col '>
      <Nav />
      {/* <DropDown setCurrentDeck={setCurrentDeck} currentDeck={currentDeck} /> */}
      {/* <Search searchResults={searchResults} setSearchResults={setSearchResults}/> */}
      <div className='flex flex-col align-middle  justify-center'>
        <button
          className='btn '
          onClick={() => addToCollectionHandler(carouselArray)}
        >
          Add Deck
        </button>

        <Carousel
          carouselArray={carouselArray}
          removefromcarousel={removeFromCarousel}
        />
      </div>
      <Search addToCarousel={addToCarousel} />
    </div>
  );
}
