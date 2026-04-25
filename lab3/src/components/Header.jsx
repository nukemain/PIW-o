import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#0056b3] text-white p-4 md:px-5 md:py-4 flex flex-col md:flex-row justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">Planszówkowicz</h1>
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <button className="px-3 py-2 bg-white text-[#333] border border-gray-300 font-bold hover:bg-gray-100 transition-colors shadow-sm rounded-sm">
          Zaloguj / Zarejestruj
        </button>
        <Link href="/game/add" className="px-3 py-2 bg-white text-[#333] border border-gray-300 font-bold hover:bg-gray-100 transition-colors shadow-sm rounded-sm text-center">
          Dodaj nową pozycję
        </Link>
        <button className="px-3 py-2 bg-white text-[#333] border border-gray-300 font-bold hover:bg-gray-100 transition-colors shadow-sm rounded-sm">
          Koszyk
        </button>
      </div>
    </header>
  );
}
