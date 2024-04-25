import React from "react";
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

import NavbarComponent from "./Components/Navbar";

const App = () =>{
  const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

  return(
    <>
        <NavbarComponent/>
        <BrowserRouter>
          <Routes>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/Cart" element={<Cart isLoggedIn={LoggedIn} />} /> 
            <Route path="/SignIn" component={SignIn} />


          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;