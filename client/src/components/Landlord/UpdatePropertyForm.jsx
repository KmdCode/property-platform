import React, { useState } from 'react';
import apiClient from '../../utils/apiClient';

const UpdatePropertyForm = ({ propertyId, initialData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: initialData.name,
    description: initialData.description,
    price: initialData.price,
    location: initialData.location,
    furnished: initialData.furnished,
    webUrl: initialData.webUrl,
    phoneNumber: initialData.phoneNumber,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async () => {
   
    try {
      
      const response = await apiClient.put(
        `/landlord/properties/${propertyId}`,
        formData
      );
      onUpdate(response.data.updatedProperty); 
      onClose();
    } catch (err) {
      console.error('Error updating property:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Update Property Details</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded mr-40 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="webUrl">
            Link to property:
            </label>
            <input
              type="text"
              id="webUrl"
              name="webUrl"
              value={formData.webUrl}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number: 
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Furnished:
            </label>
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={() => setFormData((prev) => ({ ...prev, furnished: !prev.furnished }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-cyan-800 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="bg-cyan-800 text-white py-2 px-4 ml-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyForm;
