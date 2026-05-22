"use client";

import { useAuth } from "@/context/AuthContext";
import { useGames } from "@/context/GameContext";
import { useFavorites } from "@/context/FavoritesContext";
import GameCard from "@/components/GameCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { games, isLoaded } = useGames();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !isLoaded) {
    return (
      <div className="flex-1 flex justify-center items-center bg-[#eef2f3] p-6">
        <div className="text-center p-10 bg-white border border-gray-300 rounded-md shadow-md font-bold text-gray-700">
          Ładowanie danych...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex justify-center items-center bg-[#eef2f3] p-6">
        <div className="text-center p-10 bg-white border border-gray-300 rounded-md shadow-md max-w-md">
          <p className="text-red-500 font-bold mb-4">Musisz być zalogowany, aby przeglądać ulubione gry!</p>
          <Link href="/login" className="inline-block px-5 py-2.5 bg-[#0056b3] text-white border-none cursor-pointer font-bold rounded-sm hover:bg-[#004494] transition-colors">
            Przejdź do logowania
          </Link>
        </div>
      </div>
    );
  }

  const favoriteGames = games.filter((game) => favorites.includes(game.id));

  return (
    <div className="flex-1 w-full bg-[#eef2f3] p-4 md:p-8">
      <div className="w-full max-w-[800px] mx-auto bg-white p-6 md:p-8 border border-gray-300 shadow-md rounded-md">
        <div className="mb-6 flex justify-between items-center border-b-2 border-[#0056b3] pb-3">
          <h2 className="text-[#0056b3] text-2xl font-bold">
            ❤️ Twoje Ulubione Gry
          </h2>
          <Link href="/" className="text-[#0056b3] hover:underline text-sm font-semibold flex items-center gap-1">
            ← Powrót do sklepu
          </Link>
        </div>

        {favoriteGames.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 mb-4">
              Masz obecnie {favoriteGames.length} {favoriteGames.length === 1 ? "ulubioną pozycję" : favoriteGames.length < 5 ? "ulubione pozycje" : "ulubionych pozycji"}.
            </p>
            <div className="flex flex-col gap-4">
              {favoriteGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <span className="text-6xl block mb-4">🎲</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Brak ulubionych gier</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Nie dodałeś jeszcze żadnej gry planszowej do swojej listy ulubionych. Kliknij ikonę serduszka (❤️) na karcie gry w sklepie!
            </p>
            <Link href="/" className="inline-block px-6 py-3 bg-[#0056b3] text-white font-bold rounded-sm hover:bg-[#004494] transition-colors shadow-sm">
              Przeglądaj sklep
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
