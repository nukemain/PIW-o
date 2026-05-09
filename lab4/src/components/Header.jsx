"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutMessage(true);
      setTimeout(() => {
        setShowLogoutMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Błąd wylogowywania", error);
    }
  };

  return (
    <>
      <header className="bg-[#0056b3] text-white p-4 md:px-5 md:py-4 flex flex-col md:flex-row justify-between items-center shadow-md">
        <Link href="/" className="text-2xl font-bold mb-4 md:mb-0 hover:text-gray-200">
          Planszówkowicz
        </Link>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
          {user && (
            <span className="mr-4 text-sm font-medium">
              Witaj, {user.email}
            </span>
          )}
          
          {!user ? (
            <Link href="/login" className="px-3 py-2 bg-white text-[#333] border border-gray-300 font-bold hover:bg-gray-100 transition-colors shadow-sm rounded-sm text-center">
              Zaloguj / Zarejestruj
            </Link>
          ) : (
            <button onClick={handleLogout} className="px-3 py-2 bg-red-600 text-white border border-red-700 font-bold hover:bg-red-700 transition-colors shadow-sm rounded-sm">
              Wyloguj
            </button>
          )}
          
          {user && (
            <Link href="/game/add" className="px-3 py-2 bg-white text-[#333] border border-gray-300 font-bold hover:bg-gray-100 transition-colors shadow-sm rounded-sm text-center">
              Dodaj nową pozycję
            </Link>
          )}
          <button className="px-3 py-2 bg-white text-[#333] border border-gray-300 font-bold hover:bg-gray-100 transition-colors shadow-sm rounded-sm">
            Koszyk
          </button>
        </div>
      </header>

      {/* Komunikat o wylogowaniu (Toast) */}
      {showLogoutMessage && (
        <div className="fixed top-20 right-5 bg-[#28a745] text-white px-6 py-3 rounded-md shadow-lg z-50 font-bold transition-all duration-300 animate-pulse">
          Zostałeś pomyślnie wylogowany! 👋
        </div>
      )}
    </>
  );
}
