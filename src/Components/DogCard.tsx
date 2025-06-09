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
}

const DogCard = ({ dog }: Props) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state: RootState) =>
    state.dogs.favoriteIds.includes(dog.id)
  );

  return (
    <div className="bg-[#300D38] rounded-[20px] shadow-md text-white flex flex-col h-[300px] w-full max-w-[200px] mx-auto">
      {/* Image Section - 70% Height */}
      <div className="h-[70%] w-full flex items-center justify-center">
        <div className="w-[90%] h-[90%] border-2 border-[#FFB749] rounded-[12px] overflow-hidden">
          <img
            src={dog.img}
            alt={dog.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Section - 10% Height */}
      <div className="h-[10%] px-3 py-1 text-xs space-y-1">
        <p>
          <span className="font-semibold">Name:</span> {dog.name}
        </p>
        <p>
          <span className="font-semibold">Breed:</span> {dog.breed}
        </p>
      </div>

      {/* Button Section - 20% Height */}
      <div className="h-[20%] px-3 pb-3 flex items-center">
        <button
          onClick={() => dispatch(toggleFavorite(dog.id))}
          className={`w-full py-1 rounded-full text-white text-xs font-semibold ${
            isFavorited ? "bg-red-500" : "bg-[#C83DB9] hover:bg-[#890075]"
          }`}
        >
          {isFavorited ? "Unfavorite" : "Add to favorite"}
        </button>
      </div>
    </div>
  );
};

export default DogCard;

