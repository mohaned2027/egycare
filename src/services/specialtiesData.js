// specialtiesData.js
import { 
  FaStethoscope, FaHeart, FaBrain, FaVial, FaLungs, FaBone,
  FaTooth, FaBaby, FaChild, FaDeaf, FaAllergies, FaXRay
} from "react-icons/fa";

export const specialties = [
  {
    id: 1,
    name: "General",
    desc: "General Checkups",
    doctors: 12,
    icon: <FaStethoscope size={32} color="#0C5290" />
  },
  {
    id: 2,
    name: "Cardiology",
    desc: "Heart & Blood Vessels",
    doctors: 8,
    icon: <FaHeart size={32} color="#E63946" />
  },
  {
    id: 3,
    name: "Neurology",
    desc: "Brain & Nerves",
    doctors: 6,
    icon: <FaBrain size={32} color="#6A0DAD" />
  },
  {
    id: 4,
    name: "Hematology",
    desc: "Blood Disorders",
    doctors: 4,
    icon: <FaVial size={32} color="#B71C1C" />
  },
  {
    id: 5,
    name: "Pulmonology",
    desc: "Chest & Lungs",
    doctors: 5,
    icon: <FaLungs size={32} color="#0277BD" />
  },
  {
    id: 6,
    name: "Rheumatology",
    desc: "Bones & Joints",
    doctors: 3,
    icon: <FaBone size={32} color="#6D4C41" />
  },
  {
    id: 7,
    name: "Dentistry",
    desc: "Teeth & Mouth",
    doctors: 9,
    icon: <FaTooth size={32} color="#00ACC1" />
  },
  {
    id: 8,
    name: "Pediatrics",
    desc: "Children's Care",
    doctors: 10,
    icon: <FaChild size={32} color="#3F51B5" />
  },
  {
    id: 9,
    name: "Neonatology",
    desc: "Newborn Care",
    doctors: 4,
    icon: <FaBaby size={32} color="#FF6F00" />
  },
  {
    id: 10,
    name: "Audiology (Hearing)",
    desc: "Hearing & Balance",
    doctors: 7,
    icon: <FaDeaf size={32} color="#424242" />
  },
  {
    id: 11,
    name: "Allergy & Immunology",
    desc: "Allergy Treatments",
    doctors: 5,
    icon: <FaAllergies size={32} color="#8E24AA" />
  },
  {
    id: 12,
    name: "Radiology & Imaging",
    desc: "X-Ray & MRI",
    doctors: 6,
    icon: <FaXRay size={32} color="#1E88E5" />
  }
];
