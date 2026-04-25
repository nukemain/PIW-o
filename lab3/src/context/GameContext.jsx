"use client";

import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initGames() {
      const cachedGames = localStorage.getItem("boardGamesLocalDB");
      
      if (cachedGames) {
        setGames(JSON.parse(cachedGames));
        setIsLoaded(true);
      } else {
        try {
          const res = await fetch("https://szandala.github.io/piwo-api/board-games.json");
          const data = await res.json();
          setGames(data.board_games);
          localStorage.setItem("boardGamesLocalDB", JSON.stringify(data.board_games));
        } catch (err) {
          console.error("Błąd pobierania gier:", err);
        } finally {
          setIsLoaded(true);
        }
      }
    }
    
    initGames();
  }, []);

  const addGame = (newGame) => {
    const maxId = games.reduce((max, game) => Math.max(max, game.id), 0);
    const gameWithId = { ...newGame, id: maxId + 1 };
    const newGames = [...games, gameWithId];
    setGames(newGames);
    localStorage.setItem("boardGamesLocalDB", JSON.stringify(newGames));
  };

  const updateGame = (updatedGame) => {
    const newGames = games.map((game) => (game.id === updatedGame.id ? updatedGame : game));
    setGames(newGames);
    localStorage.setItem("boardGamesLocalDB", JSON.stringify(newGames));
  };

  return (
    <GameContext.Provider value={{ games, isLoaded, addGame, updateGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  return useContext(GameContext);
}
