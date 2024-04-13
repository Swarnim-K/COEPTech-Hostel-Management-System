import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RoomAllocationPage from './pages/RoomAllocationPage.jsx';
import HostelApplicationPage from './pages/HostelApplicationPage.jsx';
import AllotmentPage from './pages/AllotmentPage.jsx';
import GuestRoomAllocationPage from './pages/GuestRoomAllocationPage.jsx';
import AllotmentMainPage from './components/AllotmentMainPage/AllotmentMainPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ComplaintPage from './pages/ComplaintPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/allocate" element={<RoomAllocationPage />} />
      <Route path="/allocate/register" element={<HostelApplicationPage />} />
      <Route path="/allotment" element={<AllotmentMainPage />} />
      <Route path="/allotment/:round/:year" element={<AllotmentPage />} />
      <Route path="/guest" element={<GuestRoomAllocationPage />} />
      <Route path="/complaint" element={<ComplaintPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

// Function to set the page title dynamically
const setPageTitle = () => {
  const { pathname } = window.location;
  let title = 'COEP Tech Hostel'; // Set your default title here

  // Set title based on the current pathname
  if (pathname === '/') {
    title = 'Home Page';
  } else if (pathname === '/login') {
    title = 'Login Page';
  } else if (pathname === '/allocate') {
    title = 'Room Allocation Page';
  } // Add more conditions as needed

  document.title = title; // Set the document title
};

// Call setPageTitle initially and whenever the route changes
setPageTitle();
router.subscribe(setPageTitle);

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
