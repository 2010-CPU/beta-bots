import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import {
  getSomething,
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
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
    </div>
    <Route to="/products">
      <ProductList />
    </Route>
    </Router>
  );
}

export default App;