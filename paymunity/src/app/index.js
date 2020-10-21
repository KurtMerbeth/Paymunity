import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { User, Main, Friends, Settings } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/user/" exact component={User} />
            <Route path="/friends/" exact component={Friends} />
            <Route path="/settings/" exact component={Settings} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;