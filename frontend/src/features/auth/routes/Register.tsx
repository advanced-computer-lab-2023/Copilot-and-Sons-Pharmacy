import React, { useState , useEffect } from "react";
import { Link  , useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TextField } from "@mui/material";
import { Radio } from "@mui/material";
import { RadioGroup } from "@mui/material"; 
import { FormControlLabel } from "@mui/material";



const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh", // Ensures the container covers the full viewport height
};

export const Register = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [dateOfBirth , setDateOfBirth] = useState("");
  const [hourlyRate , setHourlyRate] = useState("");
  const [affilation , setAffilation] = useState("");
  const [major , setMajor] = useState("");
  const [university , setUniversity] = useState("");
  const [graduationYear , setGraduationYear] = useState("");
  const [degree , setDegree] = useState("");
  

  async function submit(e) {
    console.log("submit");

    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/pharmacist/addPharmacist", {
        name,
        email,
        username,
        password,
        dateOfBirth,
        hourlyRate,
        affilation,
        status: "Pending",
        educationalBackground: {
        major,
        university,
        graduationYear,
        degree
        }
      }).then((res) => {
      
          history("/");
        alert("Your request has been sent successfully");
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err);
      });
      

    } catch (err) {
      console.log(err);
    }
  }


  return (
    
    <div style={containerStyle}>
       <form action = "POST">
      
    {/* <h3>Registeration request</h3> */}
    <Typography variant="h3">Registeration request</Typography>

    <div className="mb-3">

      
      
      {/* <label> Name </label> */}
      {/* <Typography variant="h2" component="label">Name</Typography> */}

      <TextField
        id="standard-basic" variant="standard"
          label="Name"
          type="text"
          onChange={(e) => { setName(e.target.value) }}
          placeholder="Enter your Name"
          required
        />
    </div>

    <div className="mb-3">
      {/* <label>Email </label> */}
      <TextField label ="Email" type="email"

      id="standard-basic" variant="standard"
             onChange={(e) => {setEmail(e.target.value)}}

      placeholder="Enter your email address" 
      required />
    </div>


    <div className="mb-3">
      {/* <label>Username </label> */}
      <TextField
      id="standard-basic" variant="standard"
        type="text"
        label="Username"
        onChange={(e) => {setUsername(e.target.value)}}
        placeholder="Enter userrname"
        required
      />
    </div>


    <div className="mb-3">
      {/* <label>Password </label> */}
      <TextField
      id="standard-basic" variant="standard"
        type="password"
        label ="Password"
        onChange={(e) => {setPassword(e.target.value)}}

        placeholder="Enter password"
        required
      />
    </div>
    <br/>
    <label>Date of Birth </label>

    <div className="mb-3">
      <TextField
      id="standard-basic" variant="standard"
        type="date"
        onChange={(e) => {setDateOfBirth(e.target.value)}}
        placeholder="Enter date of birth"
        required
      />
    </div>

    <div className="mb-3">
      {/* <label>Excpected Hourly Rate </label> */}
      <TextField
      id="standard-basic" variant="standard"
        type="number"
        label ="Excpected Hourly Rate"
        onChange={(e) => {setHourlyRate(e.target.value)}}
        placeholder="Enter hourly rate in $"
        required
      />
    </div>

    <div className="mb-3">
      {/* <label>Affiliation </label> */}
      <TextField
      label="Affiliation"
      id="standard-basic" variant="standard"

        type="text"
        onChange={(e) => {setAffilation(e.target.value)}}
        placeholder="Enter affiliation"
        required 
      />
    </div>
    <br/>



    <div className="mb-3">
      <label>Educational Background </label>
    </div>


    <div className="mb-3">
      {/* <label>Major </label> */}
      <TextField
      id="standard-basic" variant="standard"
      label="Major"
        type="text"
        required
        
        onChange={(e) => {setMajor(e.target.value)}}
        placeholder="Enter your major"
      />
    </div>

    <div className="mb-3">
      {/* <label>University </label> */}
      <TextField
      id="standard-basic" variant="standard"
      label="University"
        type="text"
        onChange={(e) => {setUniversity(e.target.value)}}
        placeholder="Enter your university"
        required
      />
    </div>

    <div className="mb-3">
      {/* <label>Graduation Year </label> */}
      <TextField
      id="standard-basic" variant="standard"
      required
      label="Graduation Year"
        type="number"
        onChange={(e) => {setGraduationYear(e.target.value)}}
        placeholder="Enter graduation year"
      />
    </div>
    <br/>

    <label>Select your latest Degree </label>

    


    <RadioGroup onChange={(e) => {setDegree(e.target.value)}}>
      <FormControlLabel value="Associate degree" control={<Radio />}
       label="Associate degree" />
      <FormControlLabel value="Bachelor's degree" control={<Radio />}
       label="Bachelor's degree" />
      <FormControlLabel value="Master's degree" control={<Radio />}
       label="Master's degree" />
      <FormControlLabel value="Doctoral degree" control={<Radio />}
       label="Doctoral degree" />
    </RadioGroup>
    <br/>

    



    

    


    <div className="d-grid">
      <Button type="submit" onClick={submit} className="btn btn-primary" variant="contained"
     
      endIcon={<SendIcon/>}
      >
        Request 
        
      </Button>
      
    </div>
    

    <p className="forgot-password text-right">
      Already registered <Link to="/auth/login">sign in?</Link>
    </p>
  </form>
  
  </div>



  );
};

