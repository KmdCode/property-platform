import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import axios from 'axios';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProperties = async () => {
      
      const baseUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get(`${baseUrl}/user/home`);
        setProperties(response.data.properties); // The response contains the properties with a single image
        setLoading(false);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Error loading properties');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="bg-gray-100 py-8 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
              <img
                src={property.image || '/placeholder-image.jpg'}
                alt={property.name}
                className="w-full h-45 object-cover"
              />
              
              <div className="p-4 flex-grow flex flex-col relative">
                <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <p className="font-semibold mb-2">R{property.price}/pm</p>

                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span><strong>Gender:</strong> {property.genderAllowed}</span>
                </div>
                <p className="text-sm text-gray-500 mb-1"><strong>Location:</strong> {property.location}</p>

                <p className="text-sm text-gray-500 mb-2">{property.furnished ? 'Furnished' : 'Unfurnished'}</p>
                
                
                <div className="flex justify-between items-center mt-4"> {/* Flex container for button and icon */}
                  
                    <a href = {`https://www.${property.webUrl}`} className="bg-cyan-800 text-white py-2 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      View Property
                    </a>
                    
                  <a
                    href={`https://wa.me/+27${property.phoneNumber}?text="Good Day, I would like to enquire about ${property.name}"`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 ml-2"
                  >
                    <FaWhatsapp size={28} /> {/* Increase icon size */}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
