"use client";

import Link from "next/link";
import { useGames } from "@/context/GameContext";
import { use, useState } from "react";

export default function GameDetails({ params }) {
  const { id } = use(params);
  const { games, isLoaded } = useGames();

  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!isLoaded && games.length === 0) {
    return <div className="text-center p-10 font-bold">Ładowanie gry...</div>;
  }

  const game = games.find((g) => g.id === parseInt(id));

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `https://szandala.github.io/piwo-api/images/board-games/${imagePath.split('/').pop()}`;
  };

  if (!game) {
    return (
      <div className="w-full max-w-[1100px] mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Nie znaleziono gry</h2>
        <Link href="/" className="text-[#0056b3] hover:underline">
          Wróć do strony głównej
        </Link>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full max-w-[1100px] mx-auto my-5 bg-[#eef2f3] p-4 md:p-5">
      <div className="w-full mb-5 text-sm">
        <Link href="/" className="text-[#0056b3] no-underline hover:underline">
          Strona główna
        </Link> &gt; Szczegóły gry
      </div>

      <div className="flex flex-col md:flex-row w-full gap-8 bg-[#f9f9f9] p-5 border border-[#bbbbbb] shadow-sm rounded-md">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex justify-center items-center border-2 border-dashed border-[#cccccc] min-h-[300px] bg-[#eeeeee] p-5 rounded-md mb-4">
            {game.images && game.images.length > 0 ? (
              <img
                src={`https://szandala.github.io/piwo-api/images/board-games/${game.images[currentImageIdx].split('/').pop()}`}
                alt={game.title}
                className="max-w-full max-h-full object-contain rounded-md shadow-sm"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#777777]">
                <svg className="w-20 h-20 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="font-bold">Brak zdjęcia</span>
              </div>
            )}
          </div>

          {/* miniaturik paru zdj*/}
          {game.images && game.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto w-full py-2">
              {game.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`w-16 h-16 shrink-0 border-2 rounded-md overflow-hidden transition-all ${currentImageIdx === idx ? "border-[#0056b3] opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                >
                  <img
                    src={`https://szandala.github.io/piwo-api/images/board-games/${img.split('/').pop()}`}
                    alt={`${game.title} - zdjęcie ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-[2_2_0%]">
          <h2 className="mt-0 border-none text-[28px] font-bold text-[#0056b3] mb-2">{game.title}</h2>
          <p className="text-2xl text-[#28a745] font-bold mb-5">{game.price_pln} zł</p>

          <fieldset className="mb-5 border border-[#0056b3] p-4 bg-white rounded-md">
            <legend className="font-bold text-[#0056b3] px-2 text-sm">Opis pozycji</legend>
            <div className="mt-2 text-gray-800 space-y-2">
              {Array.isArray(game.description)
                ? game.description.map((desc, idx) => <p key={idx}>{desc}</p>)
                : <p>{game.description}</p>}
            </div>
          </fieldset>

          <ul className="my-5 list-square pl-5 text-gray-800 space-y-2">
            <li><strong>Czas gry:</strong> {game.avg_play_time_minutes} min</li>
            <li><strong>Ilość graczy:</strong> {game.min_players}-{game.max_players}</li>
            <li><strong>Wydawnictwo:</strong> {game.publisher}</li>
            <li><strong>Rodzaj:</strong> {game.type}</li>
            {game.is_expansion && <li><strong>Typ:</strong> Dodatek</li>}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-5 py-2.5 bg-[#28a745] text-white border-none cursor-pointer font-bold text-base rounded-sm hover:bg-[#218838] transition-colors shadow-sm">
              Włóż do koszyka
            </button>
            <Link href={`/game/${game.id}/edit`} className="px-5 py-2.5 bg-[#ffc107] text-[#333] border-none cursor-pointer font-bold text-base rounded-sm hover:bg-[#e0a800] transition-colors shadow-sm inline-block text-center">
              Edytuj pozycję
            </Link>
            <Link href="/" className="px-5 py-2.5 bg-[#6c757d] text-white border-none cursor-pointer font-bold text-base rounded-sm hover:bg-[#5a6268] transition-colors shadow-sm inline-block text-center">
              Powrót do listy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
