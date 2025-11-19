// Authentication Service - خدمة المصادقة

export const login = async (email, password) => {
  try {
    const response = await fetch('/data/users.json');
    const users = await response.json();
    
    const user = users.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      console.log(user);
      localStorage.setItem('userToken', user.token);
      localStorage.setItem('userData', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage
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
