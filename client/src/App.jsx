import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import UserCards from './components/Usercard.jsx';
import AdminLogin from './components/Admin.jsx';
import GuestLogin from './components/Guest.jsx';
import Home from './pages/Home.jsx';
import FeatureComponent from './components/FeatureComponent'
import StudentForm from './components/StudentForm.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guest-login" element={<GuestLogin />} />
        <Route path="/admin-info" element={<FeatureComponent />} />
        <Route path="/admit-student" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
