import { useState } from 'react';
import axios from 'axios';

function StatsList() {
  const [statsList, setStatsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const Search = () => {
    console.log('Fetching query:', searchQuery);
    axios.get(`/api/search?q=${ searchQuery }`)
      .then((response) => {
        console.log("Response from GET", response.data);
        setStatsList(response.data); 
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
            { statsList.map(( stat, index )=>
        <div key={ index } className='search_results'>HEROPWRID: { stat.heroes_powers.hero_id } HPsuperpwrid: { stat.heroes_powers.super_power_id }
         Super Hero:{ stat.heroes.name } Super Hero's Alias{ stat.heroes.alias } 
         Power Level: { stat.heroes_powers.power_level } Super Power: { stat.super_powers.name } 
         Power's Description: { stat.super_powers.description }
        </div>)}
              
    </div>
  );
  }

export default StatsList;
