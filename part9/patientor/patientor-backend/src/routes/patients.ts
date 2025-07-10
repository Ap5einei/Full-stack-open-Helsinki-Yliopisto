import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newPatient = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
  res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  const entry = req.body;
  const newEntry = patientService.addEntry(patientId, entry);
  if (newEntry) {
    res.json(newEntry);
  } else {
    res.status(400).json({ error: 'Could not add entry' });
  }
});

export default router;
