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
      <img className="w-75" src="data:image/jpeg;base64,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"/>
    </div>
  );
  }

export default HeroesList;
