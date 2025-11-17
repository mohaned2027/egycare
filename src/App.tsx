// Main App Component - The main application component
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import pages
import Home from "./pages/Home";
import Specialties from "./pages/Specialties";
import SpecialtyDoctors from "./pages/SpecialtyDoctors";
import Booking from "./pages/Booking";
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
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />
        
        {/* صفحة جميع التخصصات */}
        <Route path="/specialties" element={<Specialties />} />
        
        {/* صفحة أطباء تخصص معين */}
        <Route path="/specialty/:id" element={<SpecialtyDoctors />} />
        
        {/* صفحة حجز موعد مع دكتور - محمية (تحتاج تسجيل دخول) */}
        <Route 
          path="/booking/:doctorId" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />
        
        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<Login />} />
        
        {/* لوحة تحكم المريض - محمية */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* صفحة الملف الشخصي - محمية */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* لوحة تحكم الأدمن */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* صفحة عن EgyCare */}
        <Route path="/about" element={<About />} />
        
        {/* صفحة التواصل */}
        <Route path="/contact" element={<Contact />} />
        
        {/* صفحة 404 - لو الصفحة مش موجودة */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
