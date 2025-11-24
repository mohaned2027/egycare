// Main App Component - The main application component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Import pages
import Home from "./pages/Home";
import Specialties from "./pages/Specialties";
import SpecialtyDoctors from "./pages/SpecialtyDoctors";
import Booking from "./pages/Booking";
import Confirm from "./pages/Confirm";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Profile from "./components/Profile";

// Import protection component
import ProtectedRoute from "./routes/ProtectedRoute";

// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Custom styles
import "./styles/custom.css";

const App = () => {

  // ⭐ Change Favicon Dynamically from API
    useEffect(() => {
        fetch("/data/settings.json")
          .then(res => res.json())
          .then(data => {
            const icon = document.querySelector("link[rel='icon']");
            if (icon) icon.href = data.logo ?? "/favicon.ico";
          })
          .catch(err => console.error(err));
        }, []);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/specialty/:id" element={<SpecialtyDoctors />} />

        <Route
          path="/booking/:doctorId"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route path="/confirm" element={<Confirm />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
