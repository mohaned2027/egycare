import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import SpecialtyProgress from '../components/SpecialtyProgress';
import SpecialtyGrid from '../components//SpecialtyGrid';
import NavigationButtons from '../components//NavigationButtons';

import '../pages/Specialties.css';
import SearchBar from '../components/SearchBar';

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch('/data/specialties.json').then(res => res.json()),
      fetch('/data/doctors.json').then(res => res.json())
    ])
      .then(([specData, docData]) => {
        setSpecialties(specData);
        setDoctors(docData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data', err);
        setLoading(false);
      });
  }, []);

  const getSpecialtyIcon = (icon) => {
    const iconMap = {
      heart: { icon: 'bi-heart-pulse', color: 'icon-red' },
      droplet: { icon: 'bi-droplet', color: 'icon-blue' },
      baby: { icon: 'bi-emoji-smile', color: 'icon-yellow' },
      bone: { icon: 'bi-award', color: 'icon-orange' },
      brain: { icon: 'bi-lightning', color: 'icon-purple' },
      eye: { icon: 'bi-eye', color: 'icon-green' },
    };
    return iconMap[icon] || { icon: 'bi-hospital', color: 'icon-blue' };
  };

  const filteredSpecialties = useMemo(() => {
    if (!searchTerm) return specialties;
    return specialties.filter(specialty =>
      specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialty.nameAr.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [specialties, searchTerm]);

  return (
    <div>
      <Header />

      <SpecialtyProgress step={step} />

      <section className="py-5 bg-light-egycare">
        <div className="container">
          <h2 className="section-title mb-5">All Medical Specialties</h2>
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search specialties..." 
          />

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <SpecialtyGrid
              specialties={filteredSpecialties}
              doctors={doctors}
              selectedId={selectedSpecialtyId}
              getSpecialtyIcon={getSpecialtyIcon}
              onSelect={setSelectedSpecialtyId}
            />
          )}

          <NavigationButtons
            disabled={!selectedSpecialtyId}
            onPrev={() => setStep(prev => Math.max(prev - 1, 1))}
            onNext={() => {
              setStep(2);
              navigate(`/specialty/${selectedSpecialtyId}`);
            }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Specialties;
