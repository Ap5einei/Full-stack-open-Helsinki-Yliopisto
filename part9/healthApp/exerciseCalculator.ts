export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;
  if (average < target * 0.75) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'excellent';
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

// Jos ajetaan komentoriviltä:
if (require.main === module) {
  const [, , targetArg, ...hoursArgs] = process.argv;
  if (!targetArg || hoursArgs.length === 0 || isNaN(Number(targetArg)) || hoursArgs.some(a => isNaN(Number(a)))) {
    console.log('Please provide a target and daily exercise hours as numbers');
    process.exit(1);
  }
  const target = Number(targetArg);
  const dailyHours = hoursArgs.map(Number);
  console.log(calculateExercises(dailyHours, target));
}
