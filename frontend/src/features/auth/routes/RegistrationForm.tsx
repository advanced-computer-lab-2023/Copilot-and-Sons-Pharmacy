import useAuth from "../../../hooks/auth.tsx";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import React, { useState, FormEvent, useEffect } from 'react';


import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  RegisterRequestValidator,
  emergencyContactValidator,
} from "../../../validators/user.validator.ts";
import { format, isDate } from "date-fns";
type errors = {
  [key: string]: string;
};
type FormState = {
  username: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string | null;
  gender: string;
  mobileNumber: string;
  emergencyContact: {
    fullName: string;
    mobileNumber: string;
    relation: string;
  };
};
const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emergencyContact: {
      fullName: "",
      mobileNumber: "",
      relation: "",
    },
  });

  const [errors, setErrors] = useState<errors>({});

  const [emergencyContactError, setEmergencyError] = useState<errors>({});
  const handleSubmit = async (e: FormEvent) => {
   
    e.preventDefault();
    
  try {
    RegisterRequestValidator.parse(formData);
    setErrors({});
    setEmergencyError({});
    register(formData);
    setRegistrationSuccess(true);
    navigate('/auth/login');
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: errors = {};
      error.errors.forEach((validationError) => {
        const fieldName  = validationError.path[0];
        if(typeof fieldName==='string')
       { 
        if (fieldName.startsWith('emergencyContact.')) {
          // Error in emergency contact fields
          const subField = fieldName.split('.')[1];
          emergencyContactError[subField] = validationError.message;
        } else {
          // Error in other fields
          fieldErrors[fieldName] = validationError.message;
        }
       
    }});
      setErrors(fieldErrors);
      setEmergencyError(emergencyContactError);

    }
  }


};

useEffect(() => {
  if (registrationSuccess) {
    const timeoutId = setTimeout(() => {
      setRegistrationSuccess(false);
    }, 20000); // Hide the message after 5 seconds

    return () => clearTimeout(timeoutId);
  }
}, [registrationSuccess]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof FormState;
      value: string;
    };

    if (name.startsWith("emergencyContact.")) {
      const fieldName = name.split(".")[1];
      const updatedEmergencyContact = {
        ...formData.emergencyContact,
        [fieldName]: value,
      };

      setFormData({
        ...formData,
        emergencyContact: updatedEmergencyContact,
      });

      try {
        emergencyContactValidator
          .pick({
            [fieldName]: true,
          })
          .parse({ [fieldName]: value });

        setEmergencyError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        setEmergencyError((prevErrors) => ({
          ...prevErrors,
          [fieldName]: error.message,
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    try {
      RegisterRequestValidator.pick({
        [name]: true,
      }).parse({ [name]: value });

      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {error && <div className="error-message">{error}</div>}
        {registrationSuccess && (
          <div className="success-message">Registration was successful!</div>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="UserName"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={Boolean(errors?.username)}
                helperText={errors?.username || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={(e) => {
                  try {
                    isDate(format(new Date(e.target.value), "MM-dd-yyyy"));
                    setErrors({ ...errors, dateOfBirth: "" });
                    setFormData({ ...formData, dateOfBirth: e.target.value });
                  } catch (error) {
                    setErrors({
                      ...errors,
                      dateOfBirth: "please choose a date",
                    });
                    setFormData({ ...formData, dateOfBirth: e.target.value });
                  }
                }}
                error={Boolean(errors.dateOfBirth)}
                helperText={errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                error={Boolean(errors.gender)}
                helperText={errors.gender}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                error={Boolean(errors.mobileNumber)}
                helperText={errors.mobileNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Full Name"
                type="text"
                name="emergencyContact.fullName"
                value={formData.emergencyContact.fullName}
                onChange={handleInputChange}
                required
                error={Boolean(emergencyContactError.fullName)}
                helperText={emergencyContactError.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Mobile Number"
                name="emergencyContact.mobileNumber"
                value={formData.emergencyContact.mobileNumber}
                onChange={handleInputChange}
                error={Boolean(emergencyContactError.mobileNumber)}
                helperText={emergencyContactError.mobileNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Relation"
                name="emergencyContact.relation"
                value={formData.emergencyContact.relation}
                onChange={handleInputChange}
                error={Boolean(emergencyContactError.relation)}
                helperText={emergencyContactError.relation}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default RegistrationForm;
