import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import { ProviderAuth } from './Provider/Auth';
import Login from './components/login';
import Pokedex from './components/Pokedex';
import Pokemon from './components/pokemon';
import Encounter from './components/Encounter';


function App (){
  return(
    <ProviderAuth>
      <Router>
        <Switch>
          <Route exact path='/pokedex/pokemon/:id/encounter'>
           <Encounter/> 
          </Route>
          <Route exact path='/pokedex/pokemon/:id'>
              <Pokemon/>
          </Route>
          <Route exact path='/pokedex'>
            <Pokedex/>
          </Route>
          <Route exact path='/'>
              <Login/>
          </Route>
          <Route path='*'>
            Not Found 404
          </Route>
        </Switch>
      </Router>
    </ProviderAuth>
  )
}

export default App;