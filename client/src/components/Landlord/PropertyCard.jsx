import React from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {

    const navigate = useNavigate();
    const handleManageClick = (propertyId) => {
    navigate(`/properties/${propertyId}`); // Navigate to the manage page
  };

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Rent:</strong> R{property.price}/pm</p>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Gender Allowed:</strong> {property.genderAllowed}</p>
      <p><strong>Room Type:</strong> {property.occupancyType}</p>
      <p><strong>Link:</strong> {property.webUrl}</p>
      <p><strong>Furnished:</strong> {property.furnished ? 'Yes' : 'No'}</p>
      {/* <p><strong>Date Added:</strong> {new Date(property.createdAt).toLocaleDateString()}</p> */}

      <button
        onClick={()=>handleManageClick(property._id)}
        className="bg-cyan-800 text-white py-2 px-4 mt-2 rounded-lg hover:bg-black"
      >
        Manage
      </button>
    </div>
  );
};

export default PropertyCard;
