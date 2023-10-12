import Patient, { IPatient } from "../schemas/patient.schema";

export async function fetchAllPatients(): Promise<IPatient[]> {
  
    console.log("Fetching all patients...");
    const allPatients = await Patient.find({});
    // console.log(allPatients);
    return allPatients;
  
}
