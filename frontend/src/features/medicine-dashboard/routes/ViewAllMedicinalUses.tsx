import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from '@mui/material'
import { useQuery } from 'react-query'
import { viewAllMedicinalUses, viewAllMedicines } from '../../../api/medicine'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { useState } from 'react'
import IMedicine from '@/types/medicine.type'
import MedicineCard from '@/components/MedicineCard'

const MedicinalUses = () => {
  const [selectedMedicalUses, setSelectedMedicalUses] = useState<string[]>([])

  const medicinalUses = useQuery('medicinalUses', viewAllMedicinalUses)

  const allMedicines = useQuery('allMedicines', viewAllMedicines)

  const filteredMedicines =
    allMedicines.data?.data.data.filter((medicine: IMedicine) => {
      return selectedMedicalUses.every((selectedMedicalUse) =>
        medicine.medicinalUse.includes(selectedMedicalUse)
      )
    }) ?? []

  if (medicinalUses.isLoading) {
    return <CardPlaceholder />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Card>
          <CardHeader title="Medicinal Uses" />
          <CardContent>
            <FormGroup>
              {medicinalUses.data?.data.map((medicinalUse) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMedicalUses.includes(medicinalUse)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMedicalUses([
                            ...selectedMedicalUses,
                            medicinalUse,
                          ])
                        } else {
                          setSelectedMedicalUses(
                            selectedMedicalUses.filter(
                              (selectedMedicalUse) =>
                                selectedMedicalUse !== medicinalUse
                            )
                          )
                        }
                      }}
                    />
                  }
                  label={medicinalUse}
                />
              ))}
            </FormGroup>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={9}>
        {selectedMedicalUses.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {filteredMedicines.map((medicine: IMedicine) => (
                <Grid item xs={6}>
                  <MedicineCard medicine={medicine} />
                </Grid>
              ))}
              {filteredMedicines.length === 0 && (
                <Grid item xs={12}>
                  <Alert color="warning">No medicines found</Alert>
                </Grid>
              )}
            </Grid>
          </>
        ) : (
          <>
            <Alert color="info">
              Please select at least one medicinal use to filter medicines
            </Alert>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default MedicinalUses
