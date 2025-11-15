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
        
        {/* صفحة حجز موعد مع دكتور */}
        <Route path="/booking/:doctorId" element={<Booking />} />
        
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
