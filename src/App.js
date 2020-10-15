import React, { Fragment } from 'react';
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';
import ServiceEdit from './components/ServiceEdit';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Redirect to='/services' />
        <Route path='/services' exact component={ServiceAdd} />
        <Route path='/services' exact component={ServiceList} />
        <Route path='/services/:id' exact component={ServiceEdit} />
      </Router>
    </Fragment>
  );
}

export default App;