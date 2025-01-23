import './App.css';
import Players from '../Players/Players';
import Search from '../Search/Search';
import AddPlayer from '../AddPlayer/AddPlayer';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import MatchStats from '../MatchStats/MatchStats';
import Navigation from '../Navigation/Navigation'

function App() {

  return (
    <div className="container p-3">
      <header>
        <h1>Super Heroes</h1>
      <Navigation />
      </header>
      <main>
      <Routes>
        <Route
          exact path="/"
          element={ <Home /> }
          />
        <Route
          exact path="/search"
          element={ <Search /> }
          />
        <Route
          exact path="/add-players"
          element={ <AddPlayer /> }
          />
        <Route
          exact path="/players"
          element={ <Players /> }
          />
         <Route
          exact path="/match-stats"
          element={ <MatchStats /> }
          />
       </Routes>
      </main>
    </div>
  );
}

export default App;
