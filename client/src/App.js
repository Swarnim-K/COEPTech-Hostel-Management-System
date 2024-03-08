import React from 'react';
import { Routes, Route,  BrowserRouter } from 'react-router-dom';
import UserCards from './components/Usercard.jsx';
import AdminLogin from './components/Admin.jsx';
import GuestLogin from './components/Guest.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserCards/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/guest-login" element={<GuestLogin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
