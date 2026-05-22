"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

function favoritesReducer(state, action) {
  switch (action.type) {
    case "SET_FAVORITES":
      return action.payload;
    case "ADD_FAVORITE": {
      if (state.includes(action.payload)) return state;
      const newState = [...state, action.payload];
      if (action.userId) {
        localStorage.setItem(`favorites_${action.userId}`, JSON.stringify(newState));
      }
      return newState;
    }
    case "REMOVE_FAVORITE": {
      const newState = state.filter((id) => id !== action.payload);
      if (action.userId) {
        localStorage.setItem(`favorites_${action.userId}`, JSON.stringify(newState));
      }
      return newState;
    }
    case "CLEAR_FAVORITES":
      return [];
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  // Wczytywanie ulubionych z localStorage po zalogowaniu użytkownika
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`favorites_${user.uid}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            dispatch({ type: "SET_FAVORITES", payload: parsed });
          }
        } catch (e) {
          console.error("Błąd wczytywania ulubionych z localStorage:", e);
        }
      } else {
        dispatch({ type: "SET_FAVORITES", payload: [] });
      }
    } else {
      dispatch({ type: "CLEAR_FAVORITES" });
    }
  }, [user]);

  const addFavorite = (gameId) => {
    if (!user) return;
    dispatch({ type: "ADD_FAVORITE", payload: gameId, userId: user.uid });
  };

  const removeFavorite = (gameId) => {
    if (!user) return;
    dispatch({ type: "REMOVE_FAVORITE", payload: gameId, userId: user.uid });
  };

  const isFavorite = (gameId) => {
    return favorites.includes(gameId);
  };

  const toggleFavorite = (gameId) => {
    if (!user) {
      alert("Musisz być zalogowany, aby dodawać gry do ulubionych!");
      return;
    }
    if (isFavorite(gameId)) {
      removeFavorite(gameId);
    } else {
      addFavorite(gameId);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
