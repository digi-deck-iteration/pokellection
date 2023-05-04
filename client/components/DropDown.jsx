import React, { useState, useEffect } from 'react';

const DropDown = ({ setCurrentDeck, currentDeck }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    //   console.log(name)
    const array = currentDeck.map((name) => {
      return (
        <li onClick={setCurrentDeck(name)}>
          <a>{name}</a>
        </li>
      );
    });
    setCollections(array);
  }, []);

  return (
    <div className='dropdown'>
      <label tabIndex={0} className='btn m-1'>
        Decks
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        {collections}
      </ul>
    </div>
  );
};

export default DropDown;
