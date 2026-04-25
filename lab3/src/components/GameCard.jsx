import Link from "next/link";

export default function GameCard({ game }) {
  const shortDescription = Array.isArray(game.description)
    ? game.description[0]
    : game.description;

  return (
    <div className="border border-gray-300 p-4 md:p-5 mb-5 bg-[#f9f9f9] rounded-md shadow-sm hover:shadow-md transition-shadow">
      <h3 className="mt-0 text-[#004494] text-xl font-bold mb-2">{game.title}</h3>
      <p className="mb-3 text-gray-700">{shortDescription}</p>
      
      <ul className="list-square pl-5 mb-4 text-sm text-gray-800 space-y-1">
        <li><strong>Cena:</strong> {game.price_pln} zł</li>
        <li><strong>Czas gry:</strong> {game.avg_play_time_minutes} min</li>
        <li><strong>Ilość graczy:</strong> {game.min_players}-{game.max_players}</li>
        <li><strong>Wydawnictwo:</strong> {game.publisher}</li>
        <li><strong>Rodzaj:</strong> {game.type}</li>
      </ul>
      
      <div className="flex gap-2 flex-wrap">
        <button className="px-4 py-2 bg-[#28a745] text-white border-none cursor-pointer font-bold rounded-sm hover:bg-[#218838] transition-colors">
          Dodaj do koszyka
        </button>
        <Link href={`/game/${game.id}`} className="px-4 py-2 bg-[#0056b3] text-white border-none cursor-pointer font-bold rounded-sm hover:bg-[#004494] transition-colors inline-block text-center">
          Szczegóły
        </Link>
      </div>
    </div>
  );
}
