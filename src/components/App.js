import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {
  getSomething,
  fetchUser
} from '../api';

import {
  ProductList, 
  Product,
  AccountForm,
  Account,
  Order,
} from './';

import './style/app.css'

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

  const handleLogout = () => {
    localStorage.removeItem('grace-token')
    setToken('')
    setUser({})
  }

  const fetchAndSetUser = async () => {
    try {
      const token = localStorage.getItem('grace-token')
      if(token) {
        const user = await fetchUser(token)
        setToken(token)
        setUser(user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAndSetUser()
  }, [token])
 

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
      <header>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          {!token ? <Link to="/account/login">Login</Link> : 
            <>
              <Link to="/account">Account</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          }
      </header>
        <Switch>
            <Route exact path="/">
            <div className="App">
              <h1>Hello, World!</h1>
              <h2>{ message }</h2>
              <br />
              {
                user && user.username ? <h2>Welcome, {user.username}!</h2> : null
              }
            </div> 
            </Route>
            <Route exact path="/products">
              <ProductList token={token} />
            </Route>
            <Route exact path="/products/:productId">
              <Product token={token} />
            </Route>
            <Route exact path="/orders/:orderId">
              <Order token={token}/>
            </Route>
            <Route exact path="/account">
              <Account user={user} token={token}/>
            </Route>
            <Route exact path="/account/register">
              <AccountForm setToken={setToken} register={true}/>
            </Route>
            <Route exact path="/account/login">
              <AccountForm setToken={setToken} register={false}/>
            </Route>
        </Switch>
    </Router>  
  )
}


export default App;