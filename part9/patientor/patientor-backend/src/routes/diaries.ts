import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diaryService.getEntries());
});

router.get('/non-sensitive', (_req, res) => {
  res.json(diaryService.getNonSensitiveEntries());
});

export default router;
