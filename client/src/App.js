import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import HomeLayout from './components/Homepage/HomeLayout';
import LandlordProperties from './components/Landlord/LandlordProperties';
import LoginForm from './components/Authentication/LoginForm';
import SignupForm from './components/Authentication/SignupForm';
import ProtectedRoute from './components/Protect/ProtectedRoute';
import ManageProperty from './components/Landlord/ManageProperty';
import AboutUs from './components/AboutUs/AboutUs';
import SearchResults from './components/Homepage/SearchResults';
import ContactUs from './components/ContactUs/ContactUs';
import FAQ from './components/FAQ/FAQ';


const App = () => {
  const exampleTenantId = 1; // Tenant email
  const location = useLocation();
  const isExcludedPage = ['/signin', '/signup'].includes(location.pathname);
  
  return (
    <div className='app'>
      {!isExcludedPage && <Header />}
      <main className='app-main'>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/search-results" element={<SearchResults />} />

          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute><LandlordProperties/>
          </ProtectedRoute>} />
          <Route 
            path="/properties/:propertyId" 
            element={<ProtectedRoute><ManageProperty/>
          </ProtectedRoute>} />

          <Route path='/about' element={<AboutUs />} />
          <Route path='/signin' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path='/faq' element={<FAQ />} />
        </Routes>
      </main>
      {!isExcludedPage && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

