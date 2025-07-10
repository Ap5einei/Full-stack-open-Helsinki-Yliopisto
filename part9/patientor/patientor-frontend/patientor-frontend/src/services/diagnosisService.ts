import axios from "axios";
import type { Diagnosis } from "../types";

const baseUrl = "http://localhost:3001/api/diagnoses";

export const getAll = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(baseUrl);
  return response.data;
};
