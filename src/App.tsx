// Main App Component - المكون الرئيسي للتطبيق
import { BrowserRouter, Routes, Route } from "react-router-dom";
// استيراد الصفحات
import Home from "./pages/Home";
import Specialties from "./pages/Specialties";
import SpecialtyDoctors from "./pages/SpecialtyDoctors";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
// استيراد مكون الحماية
import ProtectedRoute from "./routes/ProtectedRoute";
// استيراد Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// استيراد Custom styles
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
