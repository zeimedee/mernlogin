import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import Landing from './components/landing';

function App() {
  return (
    <div >
    <Router>
    <Navbar />


    <Switch>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/register' component={Register}></Route>
    </Switch>
    </Router>


    </div>
  );
}

export default App;
