import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/Doctor.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SpecialtyProgress from "../components/SpecialtyProgress";
import NavigationButtons from "../components/NavigationButtons";

const SpecialtyDoctors = () => {
  const { specialtyId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [specialtyName, setSpecialtyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [step, setStep] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // جلب بيانات الدكاترة
        const doctorsRes = await fetch("/data/doctors.json");
        const doctorsData = await doctorsRes.json();

        // جلب بيانات التخصصات
        const specialtiesRes = await fetch("/data/specialties.json");
        const specialtiesData = await specialtiesRes.json();

        const specIdNum = Number(specialtyId);
        console.log("specialtyId param:", specialtyId, typeof specialtyId);
        console.log("specIdNum:", specIdNum);

        // فلترة الدكاترة حسب التخصص
        const filteredDoctors = doctorsData.filter(
          (doc) => Number(doc.specialtyId) === specIdNum
        );
        setDoctors(filteredDoctors);

        // فلترة التخصص الحالي حسب specialtyId
        const currentSpecialty = specialtiesData.find(
          (spec) => Number(spec.id) === specIdNum
        );

        if (currentSpecialty) {
          setSpecialtyName(currentSpecialty.name);
        }
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [specialtyId]);

  const handleSelectDoctor = (id) => {
    setSelectedDoctorId((prev) => (prev === id ? null : id)); // toggle
  };

  return (
    <div>
      <Header />
      <SpecialtyProgress step={step} />

      <section className="py-5">
        <div className="container">
          <h2 className="section-title mb-5">
            {specialtyName ? `Doctors in ${specialtyName}` : "Doctors"}
          </h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : doctors.length === 0 ? (
            <div className="alert alert-info text-center">
              No doctors are currently available in this specialty.
            </div>
          ) : (
            <div className="row g-4">
              {doctors.map((doc) => (
                <div key={doc.id} className="col-md-4 col-lg-3 col-6">
                  <div
                    className={`doctor-card ${
                      selectedDoctorId === doc.id ? "selected" : ""
                    }`}
                    onClick={() => handleSelectDoctor(doc.id)}
                  >
                    <img
                      src={doc.image}
                      alt={doc.nameAr}
                      className="doctor-image mb-2"
                    />
                    <h5>{doc.nameAr}</h5>
                    <p className="text-muted small">
                      {doc.experience} years experience
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <NavigationButtons
            disabled={!selectedDoctorId}
            onPrev={() => navigate("/specialties")}
            onNext={() => navigate(`/booking/${selectedDoctorId}`)}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpecialtyDoctors;
