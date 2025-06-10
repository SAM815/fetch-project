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
    <div className="min-h-screen flex flex-col justify-between bg-[#FFB749]">
      {showConfetti && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}

      {showMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[9999] text-2xl sm:text-3xl font-extrabold text-[#890075] bg-white px-6 py-2 rounded-xl shadow-xl">
          We Found You a Friend!
        </div>
      )}

      <Navbar />

      <div className="w-full text-center py-4 text-xl sm:text-3xl font-bold text-[#300D38] px-4">
        Welcome {userName.toUpperCase()}! Let’s find you some friends!
      </div>

      <div className="flex flex-col xl:flex-row flex-1">
        <div className="w-full xl:w-[25%] p-4 flex justify-center">
          <div className="bg-[#300D38] py-6 px-4 rounded-lg shadow-md w-full max-w-sm text-white">
            <img src={avatarLogo} alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white mx-auto mb-6" />
            <h2 className="text-lg md:text-xl font-bold text-center">{userName.toUpperCase()}</h2>
            <p className="text-sm text-center mb-4 mt-2">{userEmail}</p>
            <div className="space-y-2">
              <button onClick={generateMatch} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 w-full text-sm">Generate Match</button>
              <button onClick={() => setShowFavorites(true)} className="bg-[#890075] text-white px-4 py-2 rounded-full hover:bg-[#FFB749] w-full text-sm">Favorites: {favorites.length}</button>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 w-full text-sm">Logout</button>
            </div>
            <p className="mt-6 text-center text-white text-3xl italic px-2 leading-relaxed">“Do you believe in love at first sight, or should I wag my tail again?”</p>
          </div>
        </div>

        <div className="w-full xl:w-[75%] p-4 flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-4">
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
              Sort: {sort === "asc" ? "Z-A" : "A-Z"}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
            {dogs.length > 0 ? (
              dogs.slice(0, 10).map((dog) => (
                <DogCard key={dog.id} dog={dog} onClick={() => setSelectedDog(dog)} />
              ))
            ) : (
              <div className="col-span-full flex flex-col justify-center items-center text-center space-y-4">
                <img src={waitingDog} alt="Dog waiting" className="w-48 h-48 object-contain" />
                <p className="text-lg font-semibold text-[#300D38]">No dogs available right now. Try a different filter or come back later!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedDog && <DogDetailModal dog={selectedDog} onClose={() => setSelectedDog(null)} />}
      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}

      {dogs.length > 0 && (
        <div className="w-full py-4 bg-[#FFB749] flex justify-center items-center gap-4 flex-wrap mt-4">
          <button
            onClick={() => loadDogs(prev || undefined, "prev")}
            disabled={!prev}
            className="bg-[#300D38] text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-[#890075]"
          >
            Prev
          </button>
          <span className="text-[#300D38] font-bold">Page: {page}</span>
          <button
            onClick={() => loadDogs(next || undefined, "next")}
            disabled={!next || !hasMoreDogs}
            className="bg-[#300D38] text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-[#890075]"
          >
            Next
          </button>
        </div>
      )}

      {matchedDog && <DogDetailModal dog={matchedDog} onClose={() => setMatchedDog(null)} />}
    </div>
  );
}

export default SearchPage;
