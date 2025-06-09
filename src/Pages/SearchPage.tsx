import { useEffect, useState } from "react";
import { fetchBreeds, searchDogs, getDogsByIds, matchDog } from "../API/dogs";
import DogCard from "../Components/DogCard";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import Navbar from "../Components/Navbar";

function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [dogs, setDogs] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);

  const favorites = useSelector((state: RootState) => state.dogs.favoriteIds);
  const userName = useSelector((state: RootState) => state.auth.name);

  const buildQuery = () => {
    let q = `sort=breed:${sort}`;
    if (selectedBreed) q += `&breeds=${selectedBreed}`;
    return q;
  };

  const loadDogs = async (query?: string) => {
    const { resultIds, next, prev } = await searchDogs(query || buildQuery());
    const dogObjects = await getDogsByIds(resultIds);
    setDogs(dogObjects);
    setNext(next || null);
    setPrev(prev || null);
  };

  useEffect(() => {
    fetchBreeds().then(setBreeds);
    loadDogs();
  }, [selectedBreed, sort]);

  const generateMatch = async () => {
    const { match } = await matchDog(favorites);
    const [matchedDog] = await getDogsByIds([match]);
    alert(`You matched with: ${matchedDog.name}`);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FFB749]">
      <Navbar />

      {/* Header */}
      <div className="w-full text-center py-2 text-xl font-bold text-[#300D38]">
        Welcome {userName.toUpperCase()}, let’s find you some friends!
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-[20%] pt-[72px] flex justify-center items-start">
          <div className="bg-[#300D38] py-4 px-4 rounded-lg shadow-md w-[90%] flex flex-col items-center">
            <div className="w-[90%] flex flex-col gap-3">
              <h2 className="font-bold text-lg text-white text-center">Filter Options</h2>
              <input placeholder="Name" className="p-2 rounded bg-[#FFB749]" />
              <select onChange={(e) => setSelectedBreed(e.target.value || null)} className="p-2 rounded bg-[#FFB749]">
                <option value="">All Breeds</option>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
              <input placeholder="Age" className="p-2 rounded bg-[#FFB749]" />
              <input placeholder="State" className="p-2 rounded bg-[#FFB749]" />
              <input placeholder="County" className="p-2 rounded bg-[#FFB749]" />
              <input placeholder="Zip-Code" className="p-2 rounded bg-[#FFB749]" />

              <button className="bg-[#C83DB9] text-white py-2 rounded-full">Filter</button>
              <button onClick={generateMatch} className="bg-green-500 text-white py-2 rounded-full">Generate Match</button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-[80%] p-4 flex flex-col gap-4">
          {/* Upper Right - Search & Sort */}
          <div className="flex justify-center gap-4">
            <input placeholder="Search..." className="p-2 w-1/2 rounded bg-white" />
            <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
              className="bg-[#300D38] text-white px-4 py-2 rounded">
              Sort: {sort.toUpperCase()}
            </button>
          </div>

          {/* Lower Right - Dog Cards */}
          <div className="grid grid-cols-5 gap-2 flex-1">
            {dogs.slice(0, 10).map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-2 bg-[#FFB749] flex justify-center items-center gap-4">
        <button
          onClick={() => loadDogs(prev || undefined)}
          disabled={!prev}
          className="bg-[#300D38] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-[#300D38] font-bold">Page: 1</span>

        <button
          onClick={() => loadDogs(next || undefined)}
          disabled={!next}
          className="bg-[#300D38] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
