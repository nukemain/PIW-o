"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initGames() {
      try {
        const gamesCol = collection(db, "games");
        const gamesSnapshot = await getDocs(gamesCol);
        const gamesList = gamesSnapshot.docs.map(doc => ({ ...doc.data(), id: parseInt(doc.id) }));
        setGames(gamesList.sort((a,b) => a.id - b.id));
        setIsLoaded(true);
      } catch (err) {
        console.error("Błąd pobierania gier z Firestore:", err);
        setIsLoaded(true);
      }
    }
    
    initGames();
  }, []);

  const addGame = async (newGame) => {
    const maxId = games.reduce((max, game) => Math.max(max, game.id), 0);
    const gameWithId = { ...newGame, id: maxId + 1 };
    
    setGames([...games, gameWithId]);
    await setDoc(doc(db, "games", gameWithId.id.toString()), gameWithId);
  };

  const updateGame = async (updatedGame) => {
    setGames(games.map((game) => (game.id === updatedGame.id ? updatedGame : game)));
    
    const gameRef = doc(db, "games", updatedGame.id.toString());
    await updateDoc(gameRef, updatedGame);
  };

  const buyGame = async (gameId) => {
    setGames(games.map((game) => 
      game.id === gameId ? { ...game, isPurchased: true } : game
    ));
    
    const gameRef = doc(db, "games", gameId.toString());
    await updateDoc(gameRef, { isPurchased: true });
  };

  const deleteGame = async (gameId) => {
    setGames(games.filter((game) => game.id !== gameId));
    
    const gameRef = doc(db, "games", gameId.toString());
    await deleteDoc(gameRef);
  };

  return (
    <GameContext.Provider value={{ games, isLoaded, addGame, updateGame, buyGame, deleteGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  return useContext(GameContext);
}
