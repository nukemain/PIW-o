"use client";

import { useState, useEffect } from "react";
import { useGames } from "@/context/GameContext";
import Filters from "./Filters";
import GameCard from "./GameCard";

const ITEMS_PER_PAGE = 10;

export default function GameStore() {
  const { games, isLoaded } = useGames();

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    type: "",
    players: "",
    publisher: "",
    playTime: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (!isLoaded && games.length === 0) {
    return <div className="text-center p-10 font-bold">Ładowanie gier...</div>;
  }

  const filteredGames = games.filter((game) => {
    if (filters.minPrice && game.price_pln < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && game.price_pln > parseFloat(filters.maxPrice)) return false;
    if (filters.type && game.type.toLowerCase() !== filters.type.toLowerCase()) return false;
    if (filters.players) {
      const p = parseInt(filters.players);
      if (p < game.min_players || p > game.max_players) return false;
    }
    if (filters.publisher && !game.publisher.toLowerCase().includes(filters.publisher.toLowerCase())) return false;
    if (filters.playTime && game.avg_play_time_minutes > parseInt(filters.playTime)) return false;
    
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / ITEMS_PER_PAGE));
  const currentGames = filteredGames.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="flex flex-col md:flex-row w-full max-w-[1100px] mx-auto my-5 bg-white p-5 border border-gray-300 shadow-md rounded-md">
      <section className="w-full md:w-1/4 md:pr-5 md:border-r-2 md:border-gray-100 mb-8 md:mb-0">
        <Filters filters={filters} setFilters={setFilters} />
      </section>

      <section className="w-full md:w-3/4 md:pl-5 flex flex-col">
        <h2 className="text-[#0056b3] border-b-2 border-[#0056b3] pb-1 mb-5 text-xl font-bold">
          Lista pozycji
        </h2>
        
        {currentGames.length > 0 ? (
          <div className="flex flex-col gap-4 flex-1">
            {currentGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mt-4 flex-1">Brak wyników spełniających kryteria.</p>
        )}

        {/* Pagination Controls */}
        {filteredGames.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-200">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#0056b3] text-white font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#004494] transition-colors"
            >
              Poprzednia
            </button>
            <span className="font-bold text-gray-700">
              Strona {currentPage} z {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#0056b3] text-white font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#004494] transition-colors"
            >
              Następna
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
