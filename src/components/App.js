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
  ProductList,
  Product
} from './'

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

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
        <Route exact path="/">
          <div className="App">
            <h1>Hello, World!</h1>
            <h2>{ message }</h2>
          </div>
        </Route>
        <Route exact path="/products">
          <ProductList />
        </Route>
        <Route exact path="/products/:productId">
          <Product token={token} />
        </Route>
    </Router>
  );
}

export default App;