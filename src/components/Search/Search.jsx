import { useState } from 'react';
import axios from 'axios';

function HeroesList() {
  const [heroesList, setHeroesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const Search = () => {
    console.log('Fetching query:', searchQuery);
    axios.get(`/api/search?q=${ searchQuery }`)
      .then((response) => {
        console.log("Response from GET", response.data);
        setHeroesList(response.data); 
        console.log('updated response', response.data )
      })
      .catch((error) => {
        console.log("Error on GET", error);
      });
  };

  //this function is used to make a search when the return button is hit
  //it needs to be inside the input element
  const handleKeyDown = ( event )=>{
    if( event.key === 'Enter'){
      Search();
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search" 
        value={searchQuery} 
        onChange={( e ) => setSearchQuery( e.target.value )} 
        onKeyDown={ handleKeyDown }
      /> 
      <button onClick={ Search }>Search</button>
      <div>
        {/* I learned how to setup this no results found */}
        {heroesList.length === 0 ? (
          <p>No results found.</p>
        ) : (
         heroesList.map(( hero, index) => (
            <div key={index} className="search-result">
              <p><strong>Hero: {hero.hero}</strong></p>
              <p><strong>Alias:</strong> {hero.alias}</p>
              <p><strong>Super Power:</strong> {hero.superpower}</p>
              <p><strong>Descripton:</strong> {hero.description}</p>
              <p><strong>Power Level:</strong> {hero.power_level}</p>
              <hr />
            </div>
          ))
        )}
      </div>        
    </div>
  );
  }

export default HeroesList;
