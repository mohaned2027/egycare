// Admin Dashboard - لوحة التحكم للأدمن
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // all, pending, confirmed, cancelled

  // جلب الحجوزات من localStorage
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const savedAppointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    );
    setAppointments(savedAppointments);
  };

  // تصفية الحجوزات حسب التاب النشط
  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'all') return true;
    return apt.status === activeTab;
  });

  // تغيير حالة الحجز
  const updateStatus = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  // حذف حجز
  const deleteAppointment = (appointmentId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      const updatedAppointments = appointments.filter(
        apt => apt.id !== appointmentId
      );
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    }
  };

  // الحصول على class للـ badge حسب الحالة
  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-pending',
      confirmed: 'badge-confirmed',
      cancelled: 'badge-cancelled'
    };
    return badges[status] || 'bg-secondary';
  };

  // الحصول على النص العربي للحالة
  const getStatusText = (status) => {
    const texts = {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      cancelled: 'ملغي'
    };
    return texts[status] || status;
  };

  return (
    <div>
      <Header />
      
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 admin-sidebar">
            <h5 className="text-white mb-4">
              <i className="bi bi-speedometer2 me-2"></i>
              لوحة التحكم
            </h5>
            <nav className="nav flex-column">
              <a 
                href="#" 
                className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('all');
                }}
              >
                <i className="bi bi-list-ul me-2"></i>
                جميع الحجوزات
              </a>
              <a 
                href="#" 
                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('pending');
                }}
              >
                <i className="bi bi-clock me-2"></i>
                قيد الانتظار
              </a>
              <a 
                href="#" 
                className={`nav-link ${activeTab === 'confirmed' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('confirmed');
                }}
              >
                <i className="bi bi-check-circle me-2"></i>
                مؤكدة
              </a>
              <a 
                href="#" 
                className={`nav-link ${activeTab === 'cancelled' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('cancelled');
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                ملغاة
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-md-10 admin-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>الحجوزات</h2>
              <span className="badge bg-primary fs-6">
                {filteredAppointments.length} حجز
              </span>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="text-muted">إجمالي الحجوزات</h6>
                    <h2 className="mb-0">{appointments.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="text-muted">قيد الانتظار</h6>
                    <h2 className="mb-0 text-warning">
                      {appointments.filter(a => a.status === 'pending').length}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="text-muted">مؤكدة</h6>
                    <h2 className="mb-0 text-success">
                      {appointments.filter(a => a.status === 'confirmed').length}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments Table */}
            {filteredAppointments.length === 0 ? (
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                لا توجد حجوزات حالياً
              </div>
            ) : (
              <div className="appointment-table">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>المريض</th>
                      <th>الطبيب</th>
                      <th>التخصص</th>
                      <th>اليوم</th>
                      <th>الوقت</th>
                      <th>الهاتف</th>
                      <th>السعر</th>
                      <th>الحالة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.doctorName}</td>
                        <td>{appointment.specialty}</td>
                        <td>{appointment.day}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.patientPhone}</td>
                        <td className="fw-bold">{appointment.price} جنيه</td>
                        <td>
                          <span className={`badge ${getStatusBadge(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            {appointment.status === 'pending' && (
                              <button 
                                className="btn btn-success"
                                onClick={() => updateStatus(appointment.id, 'confirmed')}
                                title="تأكيد"
                              >
                                <i className="bi bi-check"></i>
                              </button>
                            )}
                            {appointment.status !== 'cancelled' && (
                              <button 
                                className="btn btn-warning"
                                onClick={() => updateStatus(appointment.id, 'cancelled')}
                                title="إلغاء"
                              >
                                <i className="bi bi-x"></i>
                              </button>
                            )}
                            <button 
                              className="btn btn-danger"
                              onClick={() => deleteAppointment(appointment.id)}
                              title="حذف"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
