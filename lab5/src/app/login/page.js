"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const router = useRouter();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
      router.push("/");
    } catch (err) {
      setError(err.message || "Wystąpił błąd podczas logowania/rejestracji");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (err) {
      setError(err.message || "Wystąpił błąd podczas logowania z Google");
    }
  };

  return (
    <main className="w-full max-w-[500px] mx-auto my-10 bg-white p-8 border border-gray-300 shadow-md rounded-md">
      <h2 className="text-[#0056b3] border-b-2 border-[#0056b3] pb-2 mb-6 text-2xl font-bold text-center">
        {isLogin ? "Logowanie" : "Rejestracja"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block mb-1 font-bold text-gray-700">Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3]"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-gray-700">Hasło:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3]"
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-3 bg-[#0056b3] text-white font-bold rounded-sm hover:bg-[#004494] transition-colors mt-2"
        >
          {isLogin ? "Zaloguj się" : "Zarejestruj się"}
        </button>
      </form>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400">LUB</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button 
        onClick={handleGoogleLogin}
        className="w-full py-3 bg-white text-gray-700 border border-gray-300 font-bold rounded-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          <path fill="none" d="M1 1h22v22H1z" />
        </svg>
        Zaloguj przez Google
      </button>

      <div className="mt-6 text-center text-sm">
        {isLogin ? "Nie masz konta? " : "Masz już konto? "}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-[#0056b3] font-bold hover:underline"
        >
          {isLogin ? "Zarejestruj się" : "Zaloguj się"}
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <Link href="/" className="text-gray-500 hover:underline text-sm">
          Powrót do strony głównej
        </Link>
      </div>
    </main>
  );
}
