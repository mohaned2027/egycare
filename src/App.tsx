// Main App Component - The main application component
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import pages
import Home from "./pages/Home";
import Specialties from "./pages/Specialties";
import SpecialtyDoctors from "./pages/SpecialtyDoctors";
import Booking from "./pages/Booking";
import Confirm from "./pages/Confirm";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Profile from "./components/Profile";
// Import protection component
import ProtectedRoute from "./routes/ProtectedRoute";
// Import Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Custom styles
import './styles/custom.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* All Specialties Page */}
        <Route path="/specialties" element={<Specialties />} />

        {/* Doctors of Specific Specialty Page */}
        <Route path="/specialty/:id" element={<SpecialtyDoctors />} />

        {/* Book Appointment with Doctor - Protected (Requires Login) */}
        <Route
          path="/booking/:doctorId"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* Booking Confirmation Page */}
        <Route path="/confirm" element={<Confirm />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Patient Dashboard - Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile Page - Protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* About EgyCare Page */}
        <Route path="/about" element={<About />} />

        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />

        {/* 404 Page - If page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
