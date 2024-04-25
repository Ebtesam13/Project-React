
import React from 'react';
import { Navigate } from 'react-router-dom';

const Cart = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/SignIn" />;
  }

  return (
    <div>
      <h1>Cart Page</h1>
    </div>
  );
};

export default Cart;
