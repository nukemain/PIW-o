"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GameForm({ initialData = null, onSubmit }) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: Array.isArray(initialData?.description) 
      ? initialData.description.join("\n") 
      : (initialData?.description || ""),
    price_pln: initialData?.price_pln || "",
    min_players: initialData?.min_players || 1,
    max_players: initialData?.max_players || 4,
    avg_play_time_minutes: initialData?.avg_play_time_minutes || 60,
    publisher: initialData?.publisher || "",
    type: initialData?.type || "strategiczna",
    is_expansion: initialData?.is_expansion || false,
    images: initialData?.images || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Konwertowanie odpowiednich typów
    const processedData = {
      ...formData,
      id: initialData?.id, // Może być undefined jeśli to nowa gra
      price_pln: parseFloat(formData.price_pln),
      min_players: parseInt(formData.min_players),
      max_players: parseInt(formData.max_players),
      avg_play_time_minutes: parseInt(formData.avg_play_time_minutes),
      description: formData.description.split("\n").filter(line => line.trim() !== ""),
    };

    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-sm border border-gray-300">
      <div className="mb-4">
        <label className="block mb-1 font-bold text-[#0056b3]">Tytuł gry</label>
        <input 
          required
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-400 rounded-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-bold text-[#0056b3]">Cena (PLN)</label>
          <input 
            required
            type="number" 
            step="0.01"
            name="price_pln" 
            value={formData.price_pln} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-400 rounded-sm"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-[#0056b3]">Wydawnictwo</label>
          <input 
            required
            type="text" 
            name="publisher" 
            value={formData.publisher} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-400 rounded-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-bold text-[#0056b3]">Min. graczy</label>
          <input 
            required
            type="number" 
            min="1"
            name="min_players" 
            value={formData.min_players} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-400 rounded-sm"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-[#0056b3]">Max. graczy</label>
          <input 
            required
            type="number" 
            min="1"
            name="max_players" 
            value={formData.max_players} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-400 rounded-sm"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-[#0056b3]">Czas gry (min)</label>
          <input 
            required
            type="number" 
            min="1"
            name="avg_play_time_minutes" 
            value={formData.avg_play_time_minutes} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-400 rounded-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-bold text-[#0056b3]">Rodzaj gry</label>
        <select 
          name="type" 
          value={formData.type} 
          onChange={handleChange}
          className="w-full p-2 border border-gray-400 rounded-sm"
        >
          <option value="strategiczna">Strategiczna</option>
          <option value="imprezowa">Imprezowa</option>
          <option value="rodzinna">Rodzinna</option>
          <option value="karciana">Karciana</option>
          <option value="ekonomiczna">Ekonomiczna</option>
          <option value="przygodowa">Przygodowa</option>
          <option value="abstrakcyjna">Abstrakcyjna</option>
          <option value="towarzyska">Towarzyska</option>
          <option value="kooperacyjna">Kooperacyjna</option>
          <option value="zręcznościowa">Zręcznościowa</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            name="is_expansion" 
            checked={formData.is_expansion} 
            onChange={handleChange} 
            className="w-4 h-4"
          />
          <span className="font-bold text-[#0056b3]">To jest dodatek do gry</span>
        </label>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-bold text-[#0056b3]">Opis (każda linia to osobny akapit)</label>
        <textarea 
          required
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows="6"
          className="w-full p-2 border border-gray-400 rounded-sm"
        />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="px-5 py-2.5 bg-[#28a745] text-white font-bold rounded-sm hover:bg-[#218838]">
          Zapisz pozycję
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 bg-[#6c757d] text-white font-bold rounded-sm hover:bg-[#5a6268]">
          Anuluj
        </button>
      </div>
    </form>
  );
}
