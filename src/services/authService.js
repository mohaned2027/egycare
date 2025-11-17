// Authentication Service - خدمة المصادقة

// دالة تسجيل الدخول - ترسل طلب للـ API وتتحقق من البيانات
export const login = async (email, password) => {
  try {
    // جلب بيانات المستخدمين من API
    const response = await fetch('/data/users.json');
    const users = await response.json();
    
    // البحث عن المستخدم بالبريد الإلكتروني وكلمة المرور
    const user = users.find(
      u => u.email === email && u.password === password
    );
    
    // إذا وُجد المستخدم
    if (user) {
      // حفظ بيانات المستخدم في localStorage
      localStorage.setItem('userToken', user.token);
      localStorage.setItem('userData', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }));
      
      return { success: true, user };
    } else {
      // إذا لم يُوجد المستخدم
      return { 
        success: false, 
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
      };
    }
  } catch (error) {
    return { 
      success: false, 
      message: 'حدث خطأ في الاتصال بالخادم' 
    };
  }
};

// دالة تسجيل الخروج - تحذف بيانات المستخدم من localStorage
export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
};

// دالة للتحقق من أن المستخدم مسجل دخول
export const isAuthenticated = () => {
  const token = localStorage.getItem('userToken');
  return token !== null;
};

// دالة للحصول على بيانات المستخدم الحالي
export const getCurrentUser = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};
