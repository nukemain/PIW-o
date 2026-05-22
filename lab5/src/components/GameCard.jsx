import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useGames } from "@/context/GameContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function GameCard({ game }) {
  const { user } = useAuth();
  const { buyGame } = useGames();
  const { isFavorite, toggleFavorite } = useFavorites();

  const shortDescription = Array.isArray(game.description)
    ? game.description[0]
    : game.description;

  const handleBuy = () => {
    if (!user) {
      alert("Musisz być zalogowany, aby dokonać zakupu!");
      return;
    }
    buyGame(game.id);
  };

  return (
    <div className={`relative border border-gray-300 p-4 md:p-5 mb-5 bg-[#f9f9f9] rounded-md shadow-sm transition-all ${game.isPurchased ? "opacity-50 grayscale" : "hover:shadow-md"}`}>
      {user && (
        <button
          onClick={() => toggleFavorite(game.id)}
          className="absolute top-4 right-4 text-2xl hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer focus:outline-none bg-transparent border-none p-0 leading-none"
          title={isFavorite(game.id) ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        >
          {isFavorite(game.id) ? "❤️" : "🤍"}
        </button>
      )}

      <h3 className="mt-0 text-[#004494] text-xl font-bold mb-2 pr-8">
        {game.title} {game.isPurchased && <span className="text-red-600 text-sm ml-2">(WYPRZEDANE)</span>}
      </h3>
      <p className="mb-3 text-gray-700">{shortDescription}</p>
      
      <ul className="list-square pl-5 mb-4 text-sm text-gray-800 space-y-1">
        <li><strong>Cena:</strong> {game.price_pln} zł</li>
        <li><strong>Czas gry:</strong> {game.avg_play_time_minutes} min</li>
        <li><strong>Ilość graczy:</strong> {game.min_players}-{game.max_players}</li>
        <li><strong>Wydawnictwo:</strong> {game.publisher}</li>
        <li><strong>Rodzaj:</strong> {game.type}</li>
      </ul>
      
      <div className="flex gap-2 flex-wrap">
        <button 
          onClick={handleBuy}
          disabled={game.isPurchased}
          className={`px-4 py-2 text-white border-none cursor-pointer font-bold rounded-sm transition-colors ${game.isPurchased ? "bg-gray-500 cursor-not-allowed" : "bg-[#28a745] hover:bg-[#218838]"}`}
        >
          {game.isPurchased ? "Niedostępne" : "Kup Teraz"}
        </button>
        <Link href={`/game/${game.id}`} className="px-4 py-2 bg-[#0056b3] text-white border-none cursor-pointer font-bold rounded-sm hover:bg-[#004494] transition-colors inline-block text-center">
          Szczegóły
        </Link>
      </div>
    </div>
  );
}
