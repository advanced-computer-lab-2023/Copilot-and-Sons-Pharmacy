import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PharmacistDetails from "../../../components/pharmacistDetails";
import { Container, Grid } from "@mui/material";
import {Paper} from "@mui/material";

const GetPharmacists = () => {
  const [pharmacists, setPharmacists] = useState(null);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getAllPharmacists');
        if (response.status === 200) {
          setPharmacists(response.data);
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchPharmacists();
  }, []);

  return (
    <Container>  
      {/* can replace container with civ */}
      {/* <div>
        {pharmacists && pharmacists.map((pharmacist) => (
            <PharmacistDetails key={pharmacist._id} pharmacist={pharmacist} />
        ))}
      </div> */}
      {/* to allign vertically  */}
      <Grid container>
            {pharmacists && pharmacists.map((pharmacist) => (
        <Grid item sm ={6} md={3}  >
              <PharmacistDetails key={pharmacist._id} pharmacist={pharmacist} />
        </Grid>
            ))}
      
      </Grid>
    </Container>
  );
};

export default GetPharmacists;