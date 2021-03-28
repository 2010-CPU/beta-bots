import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {
  getSomething,
} from '../api';

import {
  ProductList, 
  Product
} from './';

const App = () => {
  const [message, setMessage] = useState('');
  const [token] = useState('')
 

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
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Switch>
            <Route exact path="/">
            <div className="App">
              <h1>Hello, World!</h1>
              <h2>{ message }</h2>
            </div>
            </Route>
            <Route exact path="/products">
              <ProductList token={token} />
            </Route>
            <Route exact path="/products/:productId">
              <Product token={token} />
            </Route>
        </Switch>
      </Router>  

      )
}


export default App;