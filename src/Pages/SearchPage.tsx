//Use redux to get all dogs to display favorites later

import { useEffect, useState } from "react";
import { fetchBreeds, searchDogs, getDogsByIds, matchDog } from "../API/dogs";
import DogCard from "../Components/DogCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store";
import Navbar from "../Components/Navbar";
import DogDetailModal from "../Components/DogDetailModal";
import FavoritesModal from "../Components/FavoritesModal";
import Confetti from "react-confetti";
import avatarLogo from "../Assets/Calvin.png";
import waitingDog from "../Assets/waiting_doggo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../Store/authSlice";
import { logoutUser } from "../API/auth";


function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [dogs, setDogs] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [matchedDog, setMatchedDog] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hasMoreDogs, setHasMoreDogs] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);


  const favorites = useSelector((state: RootState) => state.dogs.favoriteIds);
  const userName = useSelector((state: RootState) => state.auth.name);
  const userEmail = useSelector((state: RootState) => state.auth.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  const buildQuery = () => {
    let q = `sort=breed:${sort}`;
    if (selectedBreed) q += `&breeds=${selectedBreed}`;
    return q;
  };

  const appendQueryParams = (url: string, sort: "asc" | "desc", breed: string | null): string => {
    const baseUrl = new URL(url, window.location.origin);
    baseUrl.searchParams.set("sort", `breed:${sort}`);
    if (breed) baseUrl.searchParams.set("breeds", breed);
    return baseUrl.toString().replace(window.location.origin, "");
  };

  const loadDogs = async (url?: string, direction?: "next" | "prev") => {
    let queryToUse = "";

    if (direction === "next" && next) {
      queryToUse = appendQueryParams(next, sort, selectedBreed);
    } else if (direction === "prev" && prev) {
      queryToUse = appendQueryParams(prev, sort, selectedBreed);
    } else {
      queryToUse = buildQuery();
    }

    const { resultIds, next: newNext, prev: newPrev } = await searchDogs(queryToUse);
    const dogObjects = await getDogsByIds(resultIds);
    setDogs(dogObjects);
    setNext(newNext || null);
    setPrev(newPrev || null);
    setHasMoreDogs(!!newNext);
    setPage((prevPage) =>
      direction === "next" ? prevPage + 1 :
        direction === "prev" ? Math.max(prevPage - 1, 1) : 1
    );
  };

  useEffect(() => {
    fetchBreeds().then(setBreeds);
  }, []);

  useEffect(() => {
    setPage(1);
    setNext(null);
    setPrev(null);
    loadDogs();
  }, [selectedBreed, sort]);

  const generateMatch = async () => {
    try {
      const { match } = await matchDog(favorites);
      const [dog] = await getDogsByIds([match]);
      setMatchedDog(dog);
      setShowConfetti(true);
      setShowMessage(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowMessage(false);
      }, 4000);
    } catch (error) {
      console.error("Failed to generate match", error);
      alert("Add Favorites to generate match");
    }
  };

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}

      {showMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[9999] text-4xl font-extrabold text-[#890075] bg-white px-6 py-2 rounded-xl shadow-xl">
          We Found You a Friend!
        </div>
      )}

      <div className="h-screen flex flex-col bg-[#FFB749]">
        <Navbar />

        <div className="w-full text-center py-2 text-3xl font-bold text-[#300D38]">
          Welcome {userName.toUpperCase()}! Let’s find you some friends!
        </div>

        <div className="flex flex-1">
          <div className="w-[20%] pt-[72px] pb-[38px] flex justify-center items-start">
            <div className="bg-[#300D38] py-4 px-4 rounded-lg shadow-md w-[90%] h-full flex flex-col items-center text-white">
              <img src={avatarLogo} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white mb-6" />
              <h2 className="text-xl font-bold">{userName.toUpperCase()}</h2>
              <p className="text-sm mb-4 mt-4">{userEmail}</p>
              <button onClick={generateMatch} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 w-full mb-2 mt-4">Generate Match</button>
              <button onClick={() => setShowFavorites(true)} className="bg-[#890075] text-white px-4 py-2 rounded-full hover:bg-[#FFB749] w-full mt-4">Favorites: {favorites.length}</button>
              <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 w-full">Logout</button>
              <p className="mt-8 text-center text-white text-xl italic font-medium px-6 leading-relaxed">“Do you believe in love at first sight, or should I wag my tail again?”</p>
            </div>
          </div>

          <div className="w-[80%] p-4 flex flex-col gap-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedBreed(null);
                  setSort("asc");
                  setPage(1);
                  loadDogs();
                }}
                className="p-2 bg-[#300D38] text-white rounded hover:bg-[#4d1f66]"
                title="Home"
              >
                🏠
              </button>
              

              <button
                onClick={() => {
                  const newSort = sort === "asc" ? "desc" : "asc";
                  setSort(newSort);
                  setPage(1);
                  setNext(null);
                  setPrev(null);
                }}
                className={`px-4 py-2 rounded text-white cursor-pointer ${sort === "asc" ? "bg-[#300D38] hover:bg-[#890075]" : "bg-[#890075] hover:bg-[#300D38]"}`}
              >
                Sort: {sort === "asc" ? "A-Z" : "Z-A"}
              </button>
              <select
                value={selectedBreed || ""}
                onChange={(e) => setSelectedBreed(e.target.value === "" ? null : e.target.value)}
                className="p-2 rounded text-white bg-[#890075] font-semibold cursor-pointer"
              >
                <option value="">All Breeds</option>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-5 gap-2 flex-1">
              {dogs.length > 0 ? (
                dogs.slice(0, 10).map((dog) => (
                  <DogCard key={dog.id} dog={dog} onClick={() => setSelectedDog(dog)} />
                ))
              ) : (
                <div className="col-span-5 flex flex-col justify-center items-center text-center space-y-4">
                  <img src={waitingDog} alt="Dog waiting" className="w-64 h-64 object-contain" />
                  <p className="text-xl font-semibold text-[#300D38]">No dogs available right now. Try a different filter or come back later!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedDog && (
          <DogDetailModal dog={selectedDog} onClose={() => setSelectedDog(null)} />
        )}

        {showFavorites && (
          <FavoritesModal onClose={() => setShowFavorites(false)} />
        )}
        

        {dogs.length > 0 && (
          <div className="w-full py-2 bg-[#FFB749] flex justify-center items-center gap-4">
            <button
              onClick={() => loadDogs(prev || undefined, "prev")}
              disabled={!prev}
              className="bg-[#300D38] text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-[#300D38] font-bold">Page: {page}</span>
            <button
              onClick={() => loadDogs(next || undefined, "next")}
              disabled={!next || !hasMoreDogs}
              className="bg-[#300D38] text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {matchedDog && (
        <DogDetailModal dog={matchedDog} onClose={() => setMatchedDog(null)} />
      )}
    </>
  );
}

export default SearchPage;
