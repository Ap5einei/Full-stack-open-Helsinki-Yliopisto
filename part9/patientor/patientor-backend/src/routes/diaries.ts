import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diaryService.getEntries());
});

router.get('/non-sensitive', (_req, res) => {
  res.json(diaryService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const { date, weather, visibility, comment } = req.body;

    if (!date || !weather || !visibility || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const entries = diaryService.getEntries();
    const newId = Math.max(...entries.map(e => e.id)) + 1;

    const newEntry = {
      id: newId,
      date,
      weather,
      visibility,
      comment
    };

    entries.push(newEntry);

    res.status(201).json(newEntry);
  } catch (e) {
    res.status(400).json({ error: 'Something went wrong' });
  }
});


export default router;
