import { useEffect, useState } from "react";
import { getAll } from "../services/patientService";
import type { Patient } from "../types";

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    getAll().then(setPatients);
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            {p.name} ({p.gender}, {p.dateOfBirth}, {p.occupation})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
