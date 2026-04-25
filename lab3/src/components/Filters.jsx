export default function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFilters({
      minPrice: "",
      maxPrice: "",
      type: "",
      players: "",
      publisher: "",
      playTime: "",
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-[#0056b3] border-b-2 border-[#0056b3] pb-1 mb-4 text-xl font-bold">Filtry</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset className="border border-[#0056b3] p-4 bg-[#fcfcfc] rounded-md">
          <legend className="font-bold text-[#0056b3] px-2 text-sm">Filtrowanie pozycji</legend>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">Cena od:</label>
            <input
              type="number"
              name="minPrice"
              placeholder="0"
              min="0"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full md:w-[90%] p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3]"
            />
            <label className="block mt-2 mb-1 text-sm font-bold text-gray-700">do:</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="300"
              min="0"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full md:w-[90%] p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">Rodzaj gry:</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full md:w-[90%] p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3] bg-white"
            >
              <option value="">-- wybierz --</option>
              {/* <option value="strategiczna">Strategiczna</option>
              <option value="imprezowa">Imprezowa</option> */}
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
            <label className="block mb-1 text-sm font-bold text-gray-700">Ilość graczy:</label>
            <input
              type="number"
              name="players"
              placeholder="1"
              min="1"
              value={filters.players}
              onChange={handleChange}
              className="w-full md:w-[90%] p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">Wydawnictwo:</label>
            <input
              type="text"
              name="publisher"
              placeholder="nazwa"
              value={filters.publisher}
              onChange={handleChange}
              className="w-full md:w-[90%] p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">Czas gry (min):</label>
            <input
              type="number"
              name="playTime"
              placeholder="np. 60"
              min="1"
              value={filters.playTime}
              onChange={handleChange}
              className="w-full md:w-[90%] p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-[#0056b3]"
            />
          </div>

          <div className="flex gap-2 mt-4 w-full md:w-[90%]">
            <button
              onClick={handleReset}
              className="flex-1 py-2 bg-gray-500 text-white font-bold rounded-sm hover:bg-gray-600 transition-colors"
            >
              Wyczyść
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
