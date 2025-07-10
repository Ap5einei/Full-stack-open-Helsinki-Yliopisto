import { Patient, Entry } from '../src/types';

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    dateOfBirth: "1990-01-01",
    ssn: "123-45-6789",
    gender: "male",
    occupation: "Engineer",
    entries: [
      {
        id: "100",
        date: "2023-01-01",
        type: "HealthCheck",
        specialist: "Dr. House",
        description: "Yearly checkup",
        healthCheckRating: 0,
        diagnosisCodes: ["A00"]
      }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    dateOfBirth: "1985-05-10",
    ssn: "987-65-4321",
    gender: "female",
    occupation: "Teacher",
    entries: []
  }
];

export default patients;
