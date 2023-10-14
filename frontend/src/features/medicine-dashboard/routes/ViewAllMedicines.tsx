import { useEffect, useState } from "react";
import { Container, Grid} from "@mui/material";
import MedicineCard from "../../../components/MedicineCard";
import { viewAllMedicines } from "../../../api/medicine";
import IMedicine from "../../../types/medicine.type";


const ViewAllMedicines = () => {
  
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await viewAllMedicines();
        setMedicines(response.data.data);
      } catch (error) {
        console.error("Error fetching medicines: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container >
      <Grid container  rowSpacing={4} >
        {medicines.map((medicine: IMedicine) => (
          <Grid item xs={12} md={6} lg={4} key={medicine._id}>
            <MedicineCard medicine={medicine} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewAllMedicines;
