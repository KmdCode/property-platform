import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [isFurnished, setIsFurnished] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams({
      minPrice: minPrice,
      maxPrice: maxPrice,
      gender: gender,
      location: location,
      isFurnished: isFurnished, 
    }).toString(); 
    
    navigate(`/search-results?${params}`);
  };

  return (
    <div className="relative w-full">
      <img
        src="bg2.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto p-4 max-w-3xl mt-0">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Search for Properties</h2>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="mt-1 pt-1 pb-1 pl-2 block w-full border-2 border-cyan-800 rounded-md shadow-sm focus:border-cyan-800 focus:ring-cyan-800 sm:text-sm"
                placeholder="Enter minimum price"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="mt-1 pt-1 pb-1 pl-2 block w-full border-2 border-cyan-800 rounded-md shadow-sm focus:border-cyan-800 focus:ring-cyan-800 sm:text-sm"
                placeholder="Enter maximum price"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 pt-1 pb-1 block w-full border-2 border-cyan-800 rounded-md shadow-sm focus:border-cyan-800 focus:ring-cyan-500 sm:text-sm"
              >
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 pt-1 pb-1 block w-full border-2 border-cyan-800 rounded-md shadow-sm focus:border-cyan-800 focus:ring-cyan-800 sm:text-sm"
              >
                <option value="">Any</option>
                <option value="Hatfield">Hatfield</option>
                <option value="Sunnyside">Sunnyside</option>
                <option value="Arcadia">Arcadia</option>
                <option value="Pretoria CBD">Pretoria CBD</option>
              </select>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="furnished"
              checked={isFurnished}
              onChange={() => setIsFurnished(!isFurnished)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="furnished" className="ml-2 block text-sm text-gray-700">
              Furnished
            </label>
          </div>

          <div>
            <button
              onClick={handleSearch}
              className="w-full bg-cyan-800 text-white py-2 px-4 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
