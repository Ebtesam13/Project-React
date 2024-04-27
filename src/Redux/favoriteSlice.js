import { createSlice } from '@reduxjs/toolkit';

const storedUserId = JSON.parse(localStorage.getItem('UserId'));

const initialState = {
  favorites: [], // Array to store favorite products
  userId: storedUserId || null, // Set userId to storedUserId if available, otherwise null
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { id, title, price, description, category , image} = action.payload;
      const product = { id, title, price, description, category , image};

      const existingFavorite = state.favorites.find(
        (favProduct) => favProduct.id === product.id
      );

      if (!existingFavorite) {
        state.favorites.push(product);
        localStorage.setItem('Favorite', JSON.stringify(state.favorites)); 
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      state.favorites = state.favorites.filter((favProduct) => favProduct.id !== productId);
      localStorage.setItem('Favorite', JSON.stringify(state.favorites)); 
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('UserId', JSON.stringify(action.payload)); // Update local storage
    },
  },
});

export const { addToFavorites, removeFromFavorites, setUserId } = favoriteSlice.actions;

export default favoriteSlice.reducer;
