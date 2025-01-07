import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>

      <div className="flex flex-col md:flex-row items-center mb-12">
        <div className="w-full md:w-1/2">
          <img 
            src="aboutUs.jpg" 
            alt="About the platform"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
          <p className="text-lg text-gray-700">
            Our platform is designed to simplify the process of finding and managing accommodation for students and landlords. 
            Students can apply for accommodations, request to view properties, and view their rental details. 
            Landlords can efficiently list properties, manage tenants, and oversee their property portfolios, 
            making property management easier than ever.
          </p>
        </div>
      </div>

      <div className="bg-sky-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Benefits of Using Our Platform</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">For Students</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">
              <strong>Apply for Accommodations:</strong> Easily search and apply for accommodations listed on the platform.
            </li>
            <li className="mb-2">
              <strong>Request Property Viewings:</strong> Students can request a viewing for any property they are interested in.
            </li>
            <li>
              <strong>Stay Informed About Their Accommodation Details:</strong> Get Detailed infomation about their accommodation details and room number.
            </li>
          </ul>
        </div>
       
        <div>
          <h3 className="text-xl font-semibold mb-4">For Landlords</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">
              <strong>Efficient Tenant Management:</strong> Easily add tenants to properties and keep track of their status.
            </li>
            <li className="mb-2">
              <strong>Manage Properties:</strong> Keep your property listings up to date and manage your real estate portfolio.
            </li>
            <li>
              <strong>Streamlined Workflow:</strong> Manage everything from one platform, including tenant requests and applications.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
