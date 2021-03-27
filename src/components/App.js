import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import {
  getSomething
} from '../api';

import {
  ProductList
} from './'

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <Router>
      <Link to="/products">Products</Link>
      <Link to="/">Home</Link>
        <Route exact to="/products">
          <ProductList />
        </Route>
        <Route exact to="/">
          <div className="App">
            <h1>Hello, World!</h1>
            <h2>{ message }</h2>
          </div>
        </Route>
        <Route>
          
        </Route>
    </Router>
  );
}

export default App;