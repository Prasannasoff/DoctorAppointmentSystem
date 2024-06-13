import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/UserPage/HomePage';
import Login from './pages/UserPage/Login'
import Register from './pages/UserPage/UserRegister'
import DoctorLogin from './pages/DoctorPages/doctorLogin';
import ApplyDoctor from './pages/DoctorPages/applyDoctor';
import DoctorPage from './pages/DoctorPages/DoctorPage'
import AdminPage from './pages/AdminPage/adminPage';
import RequestPage from './pages/AdminPage/RequestPage';
import BookAppointments from './pages/UserPage/bookAppointments';
import DoctorAppointment from './pages/DoctorPages/doctorAppointment';
import AppointmentsBooked from './pages/UserPage/AppointmentsBooked';
import Notifications from './pages/UserPage/Notifications';
import LandingPage from './pages/LandingPage';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  console.log("App rendered");
  return (

    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<HomePage />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/applydoctor" element={<ApplyDoctor />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/bookAppointments" element={<BookAppointments />} />
        <Route path="/appointmentsbooked" element={<AppointmentsBooked />} />

        <Route path="/doctor/appointments" element={<DoctorAppointment />} />
        <Route path="/notifications" element={<Notifications />} />


        <Route path="/admin/request" element={<RequestPage />} />







      </Routes>
    </BrowserRouter>
  );
}

export default App;
