// LandlordProperties.js
import React, { useState } from 'react';
import properties from '../../data/properties.json'; 
import ManageAccommodation from './ManageAccommodation'; 

const LandlordProperties = ({ adminEmail }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const filteredProperties = properties.filter(
    (property) => property.agent.email === adminEmail
  );

  const handleManageClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
  };

  const handleCloseManage = () => {
    setSelectedPropertyId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Your Properties</h2>

      {selectedPropertyId ? (
        <ManageAccommodation propertyId={selectedPropertyId} onClose={handleCloseManage} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <p className="font-bold mb-2">Price: {property.price}</p>
                <p className="text-gray-500 mb-2">Location: {property.location}</p>
                <p className="text-gray-500 mb-2">Furnished: {property.furnished ? 'Yes' : 'No'}</p>
                <button
                  className="bg-cyan-800 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2"
                  onClick={() => handleManageClick(property.id)}
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandlordProperties;
