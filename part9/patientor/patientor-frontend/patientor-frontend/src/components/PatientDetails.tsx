import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne, addEntry } from "../services/patientService";
import type { Patient, Entry } from "../types";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) getOne(id).then(setPatient);
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <ul>
        {patient.entries.map((entry: Entry) => (
          <li key={entry.id}>
            <b>{entry.date}</b>: {entry.description}
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {/* Lisää lomake uuden merkinnän lisäämiseksi tähän */}
    </div>
  );
};

export default PatientDetails;
