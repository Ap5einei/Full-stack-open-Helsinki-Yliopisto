import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: (Math.random() * 1000000).toFixed(0),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  getPatients,
  addPatient,
  findById
};
