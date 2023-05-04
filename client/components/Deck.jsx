import React, { useEffect } from 'react';
import Card from './Card.jsx'
import Nav from './Nav.jsx';

export default function Deck(props) {

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
  
  // const cards = [];
  // for (let i = 0; i < 20; i++) {
  //   cards.push(<Card />);
  // }
  
  return (
    <div>
      <Nav />
      <div className="flex flex-wrap gap-4 justify-center">
        {/* {cards} */}
      </div>
    </div>
  );
}