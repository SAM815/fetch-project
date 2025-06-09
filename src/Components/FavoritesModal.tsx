import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import DogCard from "./DogCard";
import { matchDog, getDogsByIds } from "../API/dogs";
import DogDetailModal from "./DogDetailModal";
import Confetti from "react-confetti";
import waitingDog from "../Assets/waiting_doggo.png"; // Add your image here

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
}

interface Props {
  onClose: () => void;
}

const FavoritesModal: React.FC<Props> = ({ onClose }) => {
  const favoriteIds = useSelector((state: RootState) => state.dogs.favoriteIds);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (favoriteIds.length === 0) {
          setFavoriteDogs([]);
          return;
        }

        const dogs = await getDogsByIds(favoriteIds);
        setFavoriteDogs(dogs);
      } catch (error) {
        console.error("Failed to fetch favorite dogs", error);
      }
    };

    fetchFavorites();
  }, [favoriteIds]);

  const generateMatch = async () => {
    try {
      const { match } = await matchDog(favoriteIds);
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

      <div className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-[#FFB749] text-[#300D38] rounded-xl shadow-lg w-[90%] h-[80%] max-w-5xl relative flex flex-col">

          {/* Top Section */}
          <div className="h-[10%] flex items-center justify-center">
            <h2 className="text-3xl font-bold text-black">Favorites</h2>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-xl font-bold text-[#300D38] hover:text-[#890075]"
            >
              &times;
            </button>
          </div>

          {/* Middle Section */}
          <div className="flex-1 overflow-y-auto p-4">
            {favoriteDogs.length === 0 ? (
              <div className="flex flex-col justify-center items-center text-center space-y-4">
                <img
                  src={waitingDog}
                  alt="Dog waiting"
                  className="w-64 h-64 object-contain"
                />
                <p className="text-xl font-semibold text-[#300D38]">
                  Don't make this doggo wait! 🐾 Add some favorites to find your perfect match!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {favoriteDogs.map((dog) => (
                  <DogCard key={dog.id} dog={dog} />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="h-[10%] flex items-center justify-center">
            <button
              onClick={generateMatch}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
            >
              Generate Match
            </button>
          </div>
        </div>
      </div>

      {matchedDog && <DogDetailModal dog={matchedDog} onClose={() => setMatchedDog(null)} />}
    </>
  );
};

export default FavoritesModal;
