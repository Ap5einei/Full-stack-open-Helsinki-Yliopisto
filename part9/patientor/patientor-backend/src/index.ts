import express from 'express';
import diaryRouter from './routes/diaries';
import { DiaryEntry } from './types';
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;


const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
