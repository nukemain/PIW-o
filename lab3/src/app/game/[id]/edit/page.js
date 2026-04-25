"use client";

import { useGames } from "@/context/GameContext";
import GameForm from "@/components/GameForm";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { use } from "react";

export default function EditGamePage({ params }) {
  const { id } = use(params);
  const { games, updateGame, isLoaded } = useGames();
  const router = useRouter();

  if (!isLoaded) {
    return <div className="text-center p-10 font-bold">Ładowanie...</div>;
  }

  const gameToEdit = games.find((g) => g.id === parseInt(id));

  if (!gameToEdit) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Nie znaleziono gry do edycji</h2>
        <Link href="/" className="text-[#0056b3] hover:underline">Wróć do strony głównej</Link>
      </div>
    );
  }

  const handleEditSubmit = (updatedGame) => {
    updateGame(updatedGame);
    router.push(`/game/${id}`);
  };

  return (
    <main className="w-full max-w-[800px] mx-auto my-5 bg-[#eef2f3] p-4 md:p-5">
      <div className="w-full mb-5 text-sm">
        <Link href="/" className="text-[#0056b3] no-underline hover:underline">
          Strona główna
        </Link> &gt;{" "}
        <Link href={`/game/${id}`} className="text-[#0056b3] no-underline hover:underline">
          Szczegóły gry
        </Link> &gt; Edycja
      </div>

      <h2 className="text-[#0056b3] border-b-2 border-[#0056b3] pb-1 mb-5 text-2xl font-bold">
        Edycja gry: {gameToEdit.title}
      </h2>

      <GameForm initialData={gameToEdit} onSubmit={handleEditSubmit} />
    </main>
  );
}
