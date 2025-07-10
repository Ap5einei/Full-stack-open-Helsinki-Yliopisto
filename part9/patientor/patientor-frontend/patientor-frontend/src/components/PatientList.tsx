import { useEffect, useState } from "react";
import { getAll } from "../services/patientService";
import type { Patient } from "../types";
import { Link } from "react-router-dom";
import { Container, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const PatientList = () => {
  const [patients, setPatients] = useState<Omit<Patient, "entries">[]>([]);

  useEffect(() => {
    getAll().then(setPatients);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Patients</Typography>
      <Paper elevation={3}>
        <List>
          {patients.map((p) => (
            <ListItem key={p.id} divider>
              <ListItemText
                primary={<Link to={`/patients/${p.id}`}>{p.name}</Link>}
                secondary={`${p.gender}, ${p.dateOfBirth}, ${p.occupation}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default PatientList;
