import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdatePropertyForm from './UpdatePropertyForm'; 
import TenantTable from './TenantTable';
import AddTenantButton from './AddTenantButton';
import apiClient from '../../utils/apiClient';

const ManageProperty = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false); 
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await apiClient.get(`/landlord/properties/${propertyId}`);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error loading property details');
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const handleUpdateClose = () => setIsUpdateOpen(false);

  const handlePropertyUpdate = (updatedProperty) => {
    setProperty(updatedProperty); 
  };

  const handleTenantAdded = () => {
    // Refresh the tenant list or fetch updated data
  };

  const handleTenantRemoved = (tenantId) => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      tenants: prevProperty.tenants.filter((tenant) => tenant._id !== tenantId),
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {isUpdateOpen && (
        <UpdatePropertyForm
          propertyId={propertyId}
          initialData={property}
          onClose={handleUpdateClose}
          onUpdate={handlePropertyUpdate}
        />
      )}

      <h2 className="text-2xl font-semibold mb-6">Manage {property.name}</h2>
      {property.images && property.images.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-2 mb-6">
          <h3 className="text-xl font-semibold mb-4"></h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.images.map((imageUrl, index) => (
              <div key={index} className="w-full h-64">
                <img
                  src={imageUrl}
                  alt={`Property Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Property Details</h3>
        <p className="text-gray-600 mb-2">{property.description}</p>
        <p className="font-bold mb-2">Price: R{property.price}/pm</p>
        <p className="text-gray-500 mb-2">Location: {property.location}</p>
        <p className="text-gray-500 mb-2">Furnished: {property.furnished ? 'Yes' : 'No'}</p>

        <button
          onClick={() => setIsUpdateOpen(true)}
          className="bg-violet-700 text-white py-2 px-4 mt-2 rounded-lg hover:bg-violet-800"
        >
          Update
        </button>
      </div>
      
    </div>
  );
};

export default ManageProperty;
