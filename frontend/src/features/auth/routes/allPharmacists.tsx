import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PharmacistDetails from "../../../components/pharmacistDetails";

const GetPharmacists = () => {
  const [pharmacists, setPharmacists] = useState(null);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/admin/getAllPharmacists');
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
    <div>
      <div>
        {pharmacists && pharmacists.map((pharmacist) => (
            // <p key={pharmacist._id}>{pharmacist.name}</p>
            // <PharmacistDetails key={pharmacist._id} pharmacist={pharmacist} />
            <PharmacistDetails key={pharmacist._id} pharmacist={pharmacist} />
        ))}
      </div>
    </div>
  );
};

export default GetPharmacists;