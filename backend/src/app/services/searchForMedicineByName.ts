import Medicine from "../schemas/medicine.model";

export  async function getMedicineByName(name: string) {
    
      const medicines  = await Medicine.find({ name });
  
      if (!medicines) {
        return  "there's no medicines matching this name";
      }
  
      return medicines;
    
  }