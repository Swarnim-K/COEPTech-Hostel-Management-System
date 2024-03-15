<<<<<<< HEAD
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import UserCards from './components/Usercard.jsx';
import AdminLogin from './components/Admin.jsx';
import GuestLogin from './components/Guest.jsx';
import Home from './pages/Home.jsx';
import FeatureComponent from './components/FeatureComponent'
import StudentForm from './components/StudentForm.jsx';
import GuestRegistration from './components/GuestRegistration.jsx';
import AdminRegistration from './components/AdminRegistration.jsx';
import RoomAllocation from './components/RoomAllocation.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guest-login" element={<GuestLogin />} />
        <Route path="/admin-info" element={<FeatureComponent />} />
        <Route path="/admit-student" element={<StudentForm />} />
        <Route path="/guest-register" element={<GuestRegistration />} />
        <Route path="/admin-register" element={<AdminRegistration />} />
        <Route path="/room-allocate" element={<RoomAllocation />} />
      </Routes>
    </BrowserRouter>
=======
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Outlet />;
    </>
>>>>>>> redux-auth
  );
}

export default App;
