"use client";

import { useGames } from "@/context/GameContext";
import GameForm from "@/components/GameForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AddGamePage() {
  const { addGame, isLoaded } = useGames();
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!isLoaded || loading) {
    return <div className="text-center p-10 font-bold">Ładowanie...</div>;
  }

  if (!user) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Dostęp tylko dla zalogowanych</h2>
        <Link href="/login" className="text-[#0056b3] hover:underline">Zaloguj się, aby dodać grę</Link>
      </div>
    );
  }

  const handleAddSubmit = (newGame) => {
    addGame({ ...newGame, ownerId: user.uid });
    router.push("/");
  };

  return (
    <main className="w-full max-w-[800px] mx-auto my-5 bg-[#eef2f3] p-4 md:p-5">
      <div className="w-full mb-5 text-sm">
        <Link href="/" className="text-[#0056b3] no-underline hover:underline">
          Strona główna
        </Link> &gt; Dodaj nową pozycję
      </div>

      <h2 className="text-[#0056b3] border-b-2 border-[#0056b3] pb-1 mb-5 text-2xl font-bold">
        Dodawanie nowej gry
      </h2>

      <GameForm onSubmit={handleAddSubmit} />
    </main>
  );
}
