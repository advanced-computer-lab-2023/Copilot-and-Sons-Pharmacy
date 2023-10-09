import React, { useState } from "react";
import { useAddAdmin } from "../../../hooks/addAdmin";
import{AddAdminValidator} from '../../../validators/admin.validator.ts'

import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
type errors = {
    [key: string]: string;
  };
const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  // Use the custom hook
  const { addAdmin, loading, error } = useAddAdmin();
  const [errors,setError]=useState<errors>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    try {
        AddAdminValidator.pick({
          [name]: true,
        }).parse({ [name]: value });
  
        setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        setError((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      }
    };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addAdmin(formData);
  };

  return (
    <Container maxWidth="sm">
    <Box sx={{ marginTop: 4 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Login
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            error={Boolean(errors.username)}
            helperText={errors.username}
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
            required
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Adding Admin..." : "Add Admin"}
        </Button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </Box>
    </Container>
  );
};

export default AdminLogin;
