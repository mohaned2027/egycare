// Protected Route Component - مكون الحماية للصفحات
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

// مكون لحماية الصفحات - يسمح بالدخول فقط للمستخدمين المسجلين
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // التحقق من أن المستخدم مسجل دخول
  if (!isAuthenticated()) {
    // إذا لم يكن مسجل دخول، انتقل لصفحة تسجيل الدخول
    // مع حفظ الصفحة المطلوبة للعودة إليها بعد تسجيل الدخول
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // إذا كان مسجل دخول، اعرض الصفحة المطلوبة
  return children;
};

export default ProtectedRoute;
