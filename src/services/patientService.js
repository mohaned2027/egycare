// Patient Service - خدمة بيانات المريض

// دالة للحصول على بيانات المريض الكامل
export const getPatientData = async (patientId) => {
  try {
    const response = await fetch('/data/patients.json');
    const patients = await response.json();
    const patient = patients.find(p => p.id === parseInt(patientId));
    return patient || null;
  } catch (error) {
    console.error('خطأ في جلب بيانات المريض:', error);
    return null;
  }
};

// دالة للحصول على مواعيد المريض
export const getPatientAppointments = async (patientId) => {
  try {
    const response = await fetch('/data/appointments.json');
    const appointments = await response.json();
    return appointments.filter(apt => apt.patientId === parseInt(patientId));
  } catch (error) {
    console.error('خطأ في جلب المواعيد:', error);
    return [];
  }
};

// دالة للحصول على التاريخ المرضي للمريض
export const getMedicalHistory = async (patientId) => {
  try {
    const response = await fetch('/data/medicalHistory.json');
    const history = await response.json();
    return history.filter(h => h.patientId === parseInt(patientId));
  } catch (error) {
    console.error('خطأ في جلب التاريخ المرضي:', error);
    return [];
  }
};

// دالة للحصول على تحاليل المريض
export const getLabTests = async (patientId) => {
  try {
    const response = await fetch('/data/labTests.json');
    const tests = await response.json();
    return tests.filter(test => test.patientId === parseInt(patientId));
  } catch (error) {
    console.error('خطأ في جلب التحاليل:', error);
    return [];
  }
};

// دالة للحصول على الروشتات الطبية للمريض
export const getPrescriptions = async (patientId) => {
  try {
    const response = await fetch('/data/prescriptions.json');
    const prescriptions = await response.json();
    return prescriptions.filter(p => p.patientId === parseInt(patientId));
  } catch (error) {
    console.error('خطأ في جلب الروشتات:', error);
    return [];
  }
};
