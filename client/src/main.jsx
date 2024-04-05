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
import GuestHome from './components/Guest allocation/GuestHome.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/allocate" element={<RoomAllocationPage />} />
      <Route path="/allocate/register" element={<HostelApplicationPage />} />
      <Route path="/allocate/allotment" element={<AllotmentPage />} />
      <Route path="/Guesthome" element={<GuestHome />} />
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>,
);
