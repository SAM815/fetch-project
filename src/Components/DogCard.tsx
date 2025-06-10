import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { toggleFavorite } from "../Store/dogsSlice";

interface Props {
  dog: {
    id: string;
    img: string;
    name: string;
    age: number;
    breed: string;
    zip_code: string;
  };
  onClick?: () => void;
}

const DogCard = ({ dog, onClick }: Props) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state: RootState) =>
    state.dogs.favoriteIds.includes(dog.id)
  );

  return (
    <div className="bg-[#300D38] rounded-[20px] shadow-md text-white flex flex-col h-[320px] w-full max-w-[320px] mx-auto">
      {/* Image Section - 65% Height */}
      <div className="h-[65%] w-full flex items-center justify-center">
        <div className="w-[90%] h-[90%] border-2 border-[#FFB749] rounded-[12px] overflow-hidden">
          <img
            src={dog.img}
            alt={dog.name}
            onClick={onClick}
            className="cursor-pointer w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Section - 20% Height */}
      <div className="h-[20%] px-3 py-2 flex justify-between items-start text-sm font-medium">
        {/* Left Side: Name & Breed */}
        <div className="space-y-1">
          <p>
            <span className="font-semibold">Name:</span> {dog.name}
          </p>
          <p>
            <span className="font-semibold">Breed:</span> {dog.breed}
          </p>
        </div>

        {/* Right Side: Age & Zip */}
        <div className="space-y-1 text-right">
          <p>
            <span className="font-semibold">Age:</span> {dog.age}
          </p>
          <p>
            <span className="font-semibold">Zip:</span> {dog.zip_code}
          </p>
        </div>
      </div>

      {/* Button Section - 15% Height */}
      <div className="h-[15%] px-3 pb-3 flex items-center mt-1">
        <button
          onClick={() => dispatch(toggleFavorite(dog.id))}
          className={`w-full py-1 rounded-full text-white text-xs font-semibold ${isFavorited ? "bg-red-500" : "bg-[#C83DB9] hover:bg-[#ed63cf]"
            }`}
        >
          {isFavorited ? "Unfavorite" : "Add to favorite"}
        </button>
      </div>
    </div>
  );
};

export default DogCard;
