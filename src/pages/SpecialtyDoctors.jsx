import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Doctor.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SpecialtyProgress from "../components/SpecialtyProgress";
import NavigationButtons from "../components/NavigationButtons";
import DoctorCard from "../components/DoctorCard";

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

        // All Specialties
        const specialtiesRes = await fetch("/data/specialties.json");
        const specialtiesData = await specialtiesRes.json();

        const specIdNum = Number(specialtyId);

        // Filter Doctors When The Same Specialties
        const filteredDoctors = doctorsData.filter(
          (doc) => String(doc.specialtyId) === String(specIdNum)
        );
        setDoctors(filteredDoctors);

        // Filter Specialties When The Same Specialties
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
       {/* Start  Bar Of Progress Booking  */}
      <SpecialtyProgress step={step} />
      {/* End  Bar Of Progress Booking  */}

      <section className="py-5">
        <div className="container">
          <h2 className="section-title mb-5">
            {specialtyName ? `Doctors in ${specialtyName}` : "Doctors"}
          </h2>

          {/* Start Loading Doctors In This Specialties */}
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

          {/* Previous And Next Button  */}
          <NavigationButtons
            disabled={!selectedDoctorId}
            onPrev={() => navigate("/specialties")}
            onNext={() => navigate(`/booking/${selectedDoctorId}`)}
            prevText="Previous"
            nextText="Next"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpecialtyDoctors;
