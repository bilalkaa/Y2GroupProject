import React, { Component } from 'react';
import {Switch , Route} from 'react-router-dom';
import Login from './pages/Login';
import { withRouter } from 'react-router-dom';
import Index from './pages/Index'
import PrivateRoute from './component/PrivateRoute'

import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/' component={Index}/>
      </Switch>
    );
  }
}

export default withRouter(App);
