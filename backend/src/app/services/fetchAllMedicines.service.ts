import Medicine,{IMedicine} from '../schemas/medicine.model'; // Import your Medicine model

export const fetchAllMedicines = async (): Promise<IMedicine[]> => {
return await Medicine.find({quantity:{ $gt: 0 }});
};

