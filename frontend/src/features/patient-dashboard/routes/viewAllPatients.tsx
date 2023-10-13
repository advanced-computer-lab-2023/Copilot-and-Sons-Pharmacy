import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { viewAllPatients } from "../../../api/patient";
import { Link } from "react-router-dom";


const ViewPatients = () => {
  const { data: patients, isLoading, isError } = useQuery("patients", viewAllPatients);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching patients</p>;
  }

  // console.log("Patients data:", patients);

  return (
    <Container>
      <Grid container columnSpacing={4}>
        {patients.data.map((patient) => (
          <Grid item key={patient._id} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  User: 
                  <Link to={`/patient-dashboard/viewPatients/info/${patient._id}`}>{ patient.name}</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


export default ViewPatients;
