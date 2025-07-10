import axios from "axios";
import type { Patient, Entry } from "../types";

const baseUrl = "http://localhost:3001/api/patients";

export const getAll = async (): Promise<Omit<Patient, "entries">[]> => {
  const response = await axios.get<Omit<Patient, "entries">[]>(baseUrl);
  return response.data;
};

export const getOne = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${baseUrl}/${id}`);
  return response.data;
};

export const addEntry = async (
  patientId: string,
  entry: Omit<Entry, "id">
): Promise<Entry> => {
  const response = await axios.post<Entry>(`${baseUrl}/${patientId}/entries`, entry);
  return response.data;
};
