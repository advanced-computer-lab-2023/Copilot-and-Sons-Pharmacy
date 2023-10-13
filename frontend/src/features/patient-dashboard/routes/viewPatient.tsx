import React from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { viewPatientInfo } from "../../../api/patient";
import { useParams } from 'react-router-dom';

const PatientInfo = () => {
 
  const { id } = useParams();
  const { data: patient, isLoading, isError } = useQuery("patient", () => viewPatientInfo(id));
console.log(patient)

  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching patient</p>}
      {patient && 
        <Card variant="outlined">
<CardContent>
            <Typography variant="h6" component="div">
              Patient Information
            </Typography>
            
            <Typography>
              Email: {patient.data.email}
            </Typography>
            <Typography>
              Name: {patient.data.name}
            </Typography>
            <Typography>
              Date of Birth: {patient.data.dateOfBirth}
            </Typography>
            <Typography>
              Gender: {patient.data.gender}
            </Typography>
            <Typography>
              Mobile Number: {patient.data.mobileNumber}
            </Typography>
            <Typography>
              Emergency Contact: {patient.data.emergencyContact.fullName}
            </Typography>
            <Typography>
              Relation: {patient.data.emergencyContact.relation}
            </Typography>
            <Typography>
              Contact Number: {patient.data.emergencyContact.mobileNumber}
            </Typography>
          </CardContent>        </Card>
      }
    </Container>
  );
};

export default PatientInfo;
