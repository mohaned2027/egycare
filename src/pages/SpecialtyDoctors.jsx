import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Doctor.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SpecialtyProgress from "../components/SpecialtyProgress";
import NavigationButtons from "../components/NavigationButtons";
import DoctorCard from "../components/DoctorCard";
import DoctorGrid from "../components/DoctorGrid";

const SpecialtyDoctors = () => {
  const { id: specialtyId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [specialtyName, setSpecialtyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [step, setStep] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await fetch("/data/doctors.json");
        const doctorsData = await doctorsRes.json();

        // جلب بيانات التخصصات
        const specialtiesRes = await fetch("/data/specialties.json");
        const specialtiesData = await specialtiesRes.json();

        const specIdNum = Number(specialtyId);

        // فلترة الدكاترة حسب التخصص
        const filteredDoctors = doctorsData.filter(
          (doc) => String(doc.specialtyId) === String(specIdNum)
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
  <div key={doc.id} className="col-md-6 col-lg-4">
    <DoctorCard
      doctor={doc}
      selected={selectedDoctorId === doc.id}
      onClick={() => handleSelectDoctor(doc.id)}
    />
  </div>
))}

            </div>
          )}

          <NavigationButtons
            disabled={!selectedDoctorId}
            onPrev={() => navigate("/specialties")}
            onNext={() => navigate(`/booking/${selectedDoctorId}`)}
            prevText="الخلف"
            nextText="التالي"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpecialtyDoctors;
