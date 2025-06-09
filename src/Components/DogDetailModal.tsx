// DogDetailModal.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

// Optional: fix missing marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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

        {/* Bottom Section - Map */}
        <div className="mt-6 h-[345px] bg-white rounded-lg overflow-hidden border border-[#300D38]">
          {location ? (
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={12}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.latitude, location.longitude]}>
                <Popup>
                  {dog.name} is here!
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              Loading map...
            </div>
          )}
        </div>
        {/* Directions Link */}
        {location && (
          <div className="mt-4 text-center">
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(`${location.city}, ${location.state} ${dog.zip_code}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#890075] text-white px-4 py-2 rounded-lg hover:bg-[#300D38] transition"
            >
              Get Directions
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogDetailModal;
