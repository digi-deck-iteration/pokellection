import React, { useState, useEffect } from 'react';
import CardSmall from './CardSmall.jsx';

const Carousel = ({ carouselArray, removefromcarousel }) => {
  const [carouselRender, setCarouselArray] = useState([]);

  useEffect(() => {
    // console.log(carouselarray)
    const array = [];
    carouselArray.forEach((card) => {
      array.push(
        <div className='carousel-item'>
          <CardSmall
            cid={card.id_in_set}
            removefromcarousel={removefromcarousel}
            cimage={card.cimage}
          />
        </div>
      );
    });
    setCarouselArray(array);
  }, [carouselArray]);

  // const [collectionArrray, setCollectionArray] = useState([])

  // useEffect(() => {
  //   const carouselItems = carouselarray.map((card) => {
  //     return (
  //       <div className="carousel-item">
  //         <CardSmall cimage={card.cimage} />
  //       </div>
  //     )

  //   })
  //   setCollectionArray(carouselItems)
  // },[carouselarray])

  return (
    <div className='m-10 carousel carousel-center p-0 space-x-4 bg-neutral rounded-box'>
      {carouselRender}
      <div className='carousel-item'></div>
    </div>
  );
};

export default Carousel;
//useeffect dependency that checks the state of the carousel array and if there arte more things added then it keeps adding things to the return

//empty
//create an array of the search collection where we keep track of the collection
//use a loop to render new divs as long as they havent submitted, submitted will be a true or false state, once they submit then it will refresh the page or return state to 0
//
