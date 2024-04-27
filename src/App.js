import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from '../src/Redux/store'; 
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import NavbarComponent from "./Components/Navbar";
import Favorite from './Pages/Favorite';


const App = () => {
  const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

  const handleClickAddCart = (product) => {
    console.log(product)
  }

  return (
    <Provider store={store}> 
      <BrowserRouter>
        <>
          <NavbarComponent />
          <Routes>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Favorite" element={<Favorite />} />

            <Route
              path="/"
              element={<Home handleClickAddCart={handleClickAddCart} />}
            />
            <Route
              path="/Cart"
              element={<Cart isLoggedIn={LoggedIn} />}
            />
          </Routes>
        </>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
