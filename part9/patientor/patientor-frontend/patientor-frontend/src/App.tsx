import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import { CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Patientor</Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
