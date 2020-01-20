import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import UpdateGigs from './components/UpdateGigs'
import './style/basic.scss';
import Gigs from './components/Gigs';

const App = () => {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gigs">Update Gigs</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/gigs">
            <UpdateGig />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
function Home() {
  return (
    <Gigs>
      <h2>Home</h2>
    </Gigs>
  );
   
}

function UpdateGig() {
  return ( 
  <UpdateGigs>
    <h2>Update Gigs</h2>
  </UpdateGigs>
  );
}

export default App 