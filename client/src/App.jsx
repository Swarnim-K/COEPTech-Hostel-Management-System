import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import UserCards from './components/Usercard.jsx';
import AdminLogin from './components/Admin.jsx';
import GuestLogin from './components/Guest.jsx';
import Home from './pages/Home.jsx';
import FeatureComponent from './components/FeatureComponent'
import StudentForm from './components/StudentForm.jsx';
import RoomDisplay from './components/Roomdisplay.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guest-login" element={<GuestLogin />} />
        <Route path="/admin-info" element={<FeatureComponent />} />
        <Route path="/admit-student" element={<StudentForm />} />
        <Route path="//room-data" element={<RoomDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
