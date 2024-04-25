// actions/cartActions.js

export const addToCartAction = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const removeFromCartAction = (product) => ({
    type: 'REMOVE_FROM_CART',
    payload: product,
  });
  