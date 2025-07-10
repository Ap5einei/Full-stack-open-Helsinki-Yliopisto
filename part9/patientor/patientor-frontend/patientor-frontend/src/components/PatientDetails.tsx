import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/patientService";
import type { Patient, Entry } from "../types";
import { Container, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) getOne(id).then(setPatient);
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{patient.name}</Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Entries</Typography>
      <Paper elevation={2} sx={{ mt: 1 }}>
        <List>
          {patient.entries.length === 0 && (
            <ListItem>
              <ListItemText primary="No entries." />
            </ListItem>
          )}
          {patient.entries.map((entry: Entry) => (
            <ListItem key={entry.id} divider>
              <ListItemText
                primary={`${entry.date} (${entry.type})`}
                secondary={
                  <>
                    <div>{entry.description}</div>
                    {entry.diagnosisCodes && (
                      <div>
                        Diagnoses: {entry.diagnosisCodes.join(", ")}
                      </div>
                    )}
                    <div>Specialist: {entry.specialist}</div>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default PatientDetails;
