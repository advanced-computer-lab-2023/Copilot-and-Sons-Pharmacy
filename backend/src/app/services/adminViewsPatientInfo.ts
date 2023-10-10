import Patient from "../schemas/patient.schema";



export async function getPatientByUsername(username: string) {
  try {
    const patient = await Patient.findOne({ username });

    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  } catch (error) {
    console.error('Error retrieving patient:', error);
    throw error; 
  }
}