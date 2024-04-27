import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoriteSlice'; // Import addToFavorites action

// Load favorites from localStorage if available
const persistedFavorites = localStorage.getItem('Favorite')
  ? JSON.parse(localStorage.getItem('Favorite'))
  : [];

// Load userId from localStorage
const userId = JSON.parse(localStorage.getItem('UserId')) || null;

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
  preloadedState: {
    favorite: {
      favorites: persistedFavorites,
      userId: userId,
    },
  },
});

// Subscribe to Redux store changes for favorites
store.subscribe(() => {
  const { favorite } = store.getState();
  localStorage.setItem('Favorite', JSON.stringify(favorite.favorites)); // Update localStorage for favorites
});
