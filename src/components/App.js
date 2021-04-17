import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'

import {
  fetchUser,
  fetchCart
} from '../api';

import {
  ProductList, 
  Product,
  Products,
  AccountForm,
  Account,
  Order,
  Cart,
  Checkout,
  UsersList,
  SingleUser,
  CreateProduct,
  CreateUser
} from './';
import ResetPassword from './ResetPassword';


import './style/app.css'

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [order, setOrder] = useState({products: []})
  const [cart, setCart] = useState({products: []})
  const [product, setProducts] = useState({})

  const history = useHistory()

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
  const fetchAndSetCart = async () => {
    try {
        const order = await fetchCart(token)
        if(order) {
            setCart(order)
        }
    } catch (error) {
        console.log(error)
    }
}
  useEffect(() => {
    fetchAndSetUser();
    // fetchAndSetCart()
  }, [token])

  if(user && user.passwordReset) {
    alert("You must reset your password")
  }
 
  return ( 
    <Router>
      <div className="header-container">
      <img id="logo" src="/Beta_Bots_Music_Shop_Logo.png"></img>
      <header>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {token ? <Link to="/cart">Cart</Link> : ''}
          {!token ? <Link to="/account/login">Login</Link> : 
            <>
              { user && user.isAdmin ? <Link to="/admin">Admin</Link> : null }
              <Link to="/account">Account</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          }
          <hr />
          {
                user && user.username ? 
                <div className="welcome">
                  <p className="message">Logged in as {user.username}</p>
                  <img src={user.imageURL} alt={user.username}></img>
                </div> : null
          }
      </header>
      </div>
        <Switch>
            <Route exact path="/">
            <div className="App">
              <img id="guitar" src="We.gif"></img>
              <h2>{ message }</h2>
              <br />
              {/* {
                user && user.username ? <h2>Welcome, {user.username}!</h2> : null
              } */}
            </div> 
          {
            <div><img id="divider" src="divider.png"></img></div>
          }
          {
            <h2 className="review">OUR LOYAL CUSTOMERS</h2>
          }

          {
            <div className="reviews-container">
            <div className="preston"><img src="PRESTON_WALLACE.png"></img></div>
            <div className="rick"><img src="RICK_RUBIN.png"></img></div>

            </div>
          }

          {
            <footer>
              <div className="social">
              <h2>CONNECT WITH US</h2>
              <img src="instagram.png"></img>
              <img src="twitter.png"></img>
              <img src="facebook-circular-logo.png"></img>
              <img src="youtube.png"></img>
              <br />
              <p>Phone: 1-800-555-1234</p>
              <p>Email: contact@betabotsmusicshop.com</p>
              </div>
              <div className="footer-links">
              {/* <h3>ADDITIONAL LINKS</h3> */}
              <ul>
              <li><a href="">Terms &#38; Conditions </a></li>
              <li><a href="">Return and Exchange</a></li>
              <li><a href="">Shipping and Delivery</a></li>
              </ul>
              </div>
              <div className="footer-links-2">
                <ul>
              <li><a href="">Careers</a></li>
              <li><a href="">Product Support</a></li>
              <li><a href="">Product Registration</a></li>
                </ul>
              </div>
              <div className="darker-logo">
                <img src="darker-logo.png"></img>
              </div>
            </footer>
          }
            </Route>
            <Route exact path="/products">
              <ProductList token={token} cart={cart} setCart={setCart} user={user}/>
            </Route>
            <Route exact path="/products/create">
              <CreateProduct token={token} user={user}/>
            </Route>
            <Route exact path="/products/:productId">
              <Product key={product.id} token={token} product={product} setCart={setCart} cart={cart} user={user}/>
            </Route>            
            <Route exact path="/cart">
              <Cart token={token} fetchAndSetCart={fetchAndSetCart} user={user}/>
            </Route>
            <Route exact path="/cart/checkout">
              <Checkout token={token} user={user}/>
            </Route>
            <Route exact path="/orders/:orderId">
              <Order user={user} token={token}/>
            </Route>
            <Route exact path="/account">
              <Account user={user} token={token}/>
            </Route>
            <Route exact path="/admin">
              {/* <Admin /> */}
              <UsersList token={token} user={user}/>
            </Route>
            <Route exact path="/users/create">
              <CreateUser token={token} admin={user}/>
            </Route>
            <Route exact path="/users/:userId">
              <SingleUser token={token} admin={user}/>
            </Route>
            <Route exact path="/account/register">
              <AccountForm setToken={setToken} register={true}/>
            </Route>
            <Route exact path="/account/login">
              <AccountForm setToken={setToken} register={false}/>
            </Route>
            <Route exact path="/account/resetpassword">
              <ResetPassword token={token} user={user} setUser={setUser}/>
            </Route>
        </Switch>
    </Router>  
  )
}


export default App;