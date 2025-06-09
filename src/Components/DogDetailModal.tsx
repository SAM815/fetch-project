// DogDetailModal.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
}

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface Props {
  dog: Dog;
  onClose: () => void;
}

const DogDetailModal: React.FC<Props> = ({ dog, onClose }) => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.post(
          "https://frontend-take-home-service.fetch.com/locations",
          [dog.zip_code],
          { withCredentials: true }
        );
        setLocation(response.data[0]);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [dog.zip_code]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-[#FFB749] text-[#300D38] rounded-xl shadow-lg p-6 w-[90%] h-[80%] max-w-3xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-[#300D38] hover:text-[#890075]"
        >
          &times;
        </button>

        {/* Top Section - Image and Description */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="flex-1">
            <img
              src={dog.img}
              alt={dog.name}
              className="rounded-lg w-full h-64 object-cover border border-[#300D38]"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3 text-sm md:text-base">
            <p><strong>Name:</strong> {dog.name}</p>
            <p><strong>Breed:</strong> {dog.breed}</p>
            <p><strong>Age:</strong> {dog.age}</p>
            <p><strong>Zip Code:</strong> {dog.zip_code}</p>
            {location && (
              <>
                <p><strong>City:</strong> {location.city}</p>
                <p><strong>State:</strong> {location.state}</p>
                <p><strong>County:</strong> {location.county}</p>
              </>
            )}
          </div>
        </div>

        {/* Bottom Section - Placeholder for Map */}
        <div className="mt-6 h-[calc(80%-10rem)] bg-white rounded-lg flex items-center justify-center">
          <span className="text-[#300D38] italic">Map feature coming soon...</span>
        </div>
      </div>
    </div>
  );
};

export default DogDetailModal;
