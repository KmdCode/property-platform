import React, { useState } from 'react';
import apiClient from '../../utils/apiClient';

const AddPropertyForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    webUrl: '',
    phoneNumber:'',
    furnished: false,
    genderAllowed: 'any', // Default gender option
    occupancyType: 'single', // Default occupancy type
    images: [], // Updated to handle multiple images
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const selectedFiles = Array.from(files).slice(0, 6); // Limit to 6 images
      setFormData((prevData) => ({
        ...prevData,
        images: selectedFiles,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formDataToSubmit = new FormData();
    // Append regular fields
    for (const key in formData) {
      if (key === 'images') {
        // Append images separately
        formData.images.forEach((image) => {
          formDataToSubmit.append('images', image);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    try {

      const response = await apiClient.post(
        '/landlord/addProperty',
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type for form data
          },
        }
      );

      setSuccess(true);
      setLoading(false);
      onSubmit(response.data.property); // Call parent method if provided

      // Optionally, reset form after success
      setFormData({
        name: '',
        description: '',
        price: '',
        location: '',
        webUrl: '',
        phoneNumber:'',
        furnished: false,
        genderAllowed: 'any',
        occupancyType: 'single',
        images: [],
      });
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Error adding property');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Property</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4">Property added successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="webUrl"
            value={formData.webUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Link to property</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Furnished</label>
          <input
            type="checkbox"
            name="furnished"
            checked={formData.furnished}
            onChange={handleChange}
          />{' '}
          Yes
        </div>
        
        {/* Gender Allowed Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender Allowed</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="genderAllowed"
                value="female"
                checked={formData.genderAllowed === 'female'}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="genderAllowed"
                value="male"
                checked={formData.genderAllowed === 'male'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="genderAllowed"
                value="any"
                checked={formData.genderAllowed === 'any'}
                onChange={handleChange}
                className="mr-2"
              />
              Any
            </label>
          </div>
        </div>

        {/* Occupancy Type Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700">Occupancy Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="occupancyType"
                value="single"
                checked={formData.occupancyType === 'single'}
                onChange={handleChange}
                className="mr-2"
              />
              Single
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="occupancyType"
                value="sharing"
                checked={formData.occupancyType === 'sharing'}
                onChange={handleChange}
                className="mr-2"
              />
              Sharing
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Images (Max 6)</label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            accept="image/*"
            multiple // Allows multiple file selection
          />
        </div>

        {/* Submit/Cancel Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-violet-700 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
