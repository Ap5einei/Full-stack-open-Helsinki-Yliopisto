export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

// Jos ajetaan komentoriviltä:
if (require.main === module) {
  const [, , heightArg, weightArg] = process.argv;
  if (!heightArg || !weightArg || isNaN(Number(heightArg)) || isNaN(Number(weightArg))) {
    console.log("Please provide height (cm) and weight (kg) as numbers");
    process.exit(1);
  }
  const height = Number(heightArg);
  const weight = Number(weightArg);
  console.log(calculateBmi(height, weight));
}
