import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import HomeLayout from './components/Homepage/HomeLayout';
import PropertyDetails from './components/Homepage/PropertyDetails';
import LandlordProperties from './components/Admin/LandlordProperties';
import LoginForm from './components/Authentication/LoginForm';
import SignupForm from './components/Authentication/SignupForm';
import TenantDashboard from './components/Tenant/TenantDashboard';

const App = () => {
  const adminEmail = 'contact@johndoerealestate.com'; // Admin email
  const exampleTenantId = 1; // Tenant email
  const location = useLocation();
  const isExcludedPage = ['/signin', '/signup'].includes(location.pathname);
  

  return (
    <div className='app'>
      {!isExcludedPage && <Header />}
      <main className='app-main'>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route
            path="/admin"
            element={<LandlordProperties adminEmail={adminEmail} />}
          />
          <Route
            path="/tenant-dashboard"
            element={<TenantDashboard tenantId={exampleTenantId} />}
          />
          <Route path='/signin' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
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
