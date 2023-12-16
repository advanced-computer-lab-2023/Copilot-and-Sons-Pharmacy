import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import MedicineCard from '../../../components/MedicineCard'
import {
  viewAllMedicinalUses,
  viewAllMedicines,
  viewUnarchivedMedicines,
} from '../../../api/medicine'
import IMedicine from '../../../types/medicine.type'
import { UserType } from 'pharmacy-common/types/user.types'
import { OnlyAuthenticated } from '@/components/OnlyAuthenticated'
import { toast } from 'react-toastify'
import { addtoPrescriptionApi } from '@/api/doctor'
import { useAuth } from '@/hooks/auth'
import { useQuery } from 'react-query'
import FilterListIcon from '@mui/icons-material/FilterList'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ViewAllMedicines = () => {
  const { user } = useAuth()
  const [medicines, setMedicines] = useState<IMedicine[]>([])
  const [selectedMedicalUses, setSelectedMedicalUses] = useState<string[]>([])
  const [prescriptionList, setPrescriptionList] = useState<any>([])
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [resultingMedicines, setResultingMedicines] = useState<IMedicine[]>([])

  const medicinalUses = useQuery('medicinalUses', viewAllMedicinalUses)

  useEffect(() => {
    const storedPrescriptionList = localStorage.getItem('prescriptionList')

    if (storedPrescriptionList) {
      const parsedPrescriptionList = JSON.parse(storedPrescriptionList)
      console.log(parsedPrescriptionList)
      setPrescriptionList(parsedPrescriptionList)
    } else {
      // Set a default value if there is no item in local storage
      setPrescriptionList([])
    }
  }, [])

  useEffect(() => {
    // Update local storage whenever prescriptionList changes
    if (prescriptionList.length > 0) {
      localStorage.setItem('prescriptionList', JSON.stringify(prescriptionList))
    }

    console.log('local list', localStorage.getItem('prescriptionList'))
  }, [prescriptionList])

  const updatePrescriptionList = () => {
    // Save the updated prescriptionList to local storage
    localStorage.setItem('prescriptionList', JSON.stringify(prescriptionList))
  }

  const addToPrescription = (medicineItem: any) => {
    if (prescriptionList.some((item: any) => item.name === medicineItem.name)) {
      toast.error('Medicine already added to prescription!', {
        position: 'top-right',
      })
    } else {
      setPrescriptionList((prevList: any) => [...prevList, medicineItem])
      updatePrescriptionList()
      toast.success('Added to Prescription!', {
        position: 'top-right',
      })
    }
  }

  // async function h(medicinename: string) {
  //   try {
  //     await addtoPrescriptionApi(medicinename)
  //     toast.success('Added to Prescription!', {
  //       position: 'top-right',
  //     })
  //   } catch (e: any) {
  //     toast.error(e.message, {
  //       position: 'top-right',
  //     })
  //   }
  // }

  const handleSubmitPrescription = async () => {
    if (prescriptionList.length === 0) {
      toast.error('Prescription is empty!', {
        position: 'top-right',
      })

      return
    }

    try {
      // Call the addtoPrescriptionApi with the prescriptionList
      await addtoPrescriptionApi(prescriptionList)

      // Assuming the API call was successful, you can clear the prescription list
      setPrescriptionList([])
      localStorage.setItem('prescriptionList', JSON.stringify([]))

      if (localStorage.getItem('PrescriptionId')) {
        toast.success('Prescription updated successfully!', {
          position: 'top-right',
        })
        localStorage.removeItem('PrescriptionId')
      } else {
        toast.success('Prescription submitted successfully!', {
          position: 'top-right',
        })
      }
    } catch (error) {
      // Handle any errors from the API call
      toast.error('Error submitting prescription. Please try again later.', {
        position: 'top-right',
      })
    }
  }

  const [editingItem, setEditingItem] = useState(null) // State to track the item being edited
  const [editForm, setEditForm] = useState({
    name: '',
    quantity: '',
    dosage: '',
  })

  // Function to open edit dialog
  const openEditDialog = (item: any) => {
    setEditingItem(item)
    setEditForm({
      name: item.name,
      quantity: item.quantity,
      dosage: item.dosage,
    })
  }

  // Function to handle the update
  const handleUpdate = () => {
    setPrescriptionList((prevList: any) =>
      prevList.map((item: any) =>
        item.name === editForm!.name ? { ...item, ...editForm } : item
      )
    )
    setEditingItem(null) // Close dialog after update
  }

  const handleFormChange = (e: any) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await viewAllMedicines()

        if (user?.type === UserType.Patient) {
          response = await viewUnarchivedMedicines()
        }

        setMedicines(response.data.data)
        setResultingMedicines(response.data.data)
      } catch (error) {
        console.error('Error fetching medicines: ', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Filter medicines based on the search text
    let filteredMedicines = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchText.toLowerCase())
    )

    if (selectedMedicalUses.length > 0) {
      filteredMedicines = filteredMedicines.filter((medicine) => {
        return selectedMedicalUses.every((selectedMedicalUse) =>
          medicine.medicinalUse.includes(selectedMedicalUse)
        )
      })
    }

    if (!searchText && selectedMedicalUses.length === 0) {
      filteredMedicines = filteredMedicines.filter(
        (medicine) => medicine.quantity > 0
      )
    }

    setResultingMedicines(filteredMedicines)
  }, [searchText, medicines, selectedMedicalUses])

  return (
    <>
      {/* Search Bar */}

      <Accordion
        style={{
          width: '75%',
          margin: 'auto',
          textAlign: 'center',
          marginBottom: '30px',
          marginTop: '15px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '5px',
        }}
        expanded={isAccordionExpanded}
        onChange={() => setIsAccordionExpanded(!isAccordionExpanded)}
      >
        <AccordionSummary style={{ justifyContent: 'center' }}>
          <FilterListIcon style={{ marginRight: 15 }} />
          <Typography align="left" sx={{ fontSize: '17.14px' }}>
            Filter
          </Typography>
          <Typography align="right" sx={{ width: '100%', fontSize: '1.5rem' }}>
            {isAccordionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="Search for medicine by name"
                variant="outlined"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: '20px', width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Card>
                <CardContent>
                  <Typography align="left" sx={{ width: '100%' }}>
                    {' '}
                    Filter by Medicinal Uses
                  </Typography>
                  <FormGroup
                    row
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}
                  >
                    {medicinalUses.data?.data.map((medicinalUse) => (
                      <div
                        key={medicinalUse}
                        style={{
                          width: '150px',
                          border: '1px solid #ccc',
                          padding: '10px',
                          margin: '8px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedMedicalUses.includes(
                                medicinalUse
                              )}
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
                      </div>
                    ))}
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <OnlyAuthenticated requiredUserType={UserType.Doctor}>
        <div>
          <h3>Prescription List</h3>
          <ol>
            {prescriptionList.map((medicineItem: any) => (
              <li key={medicineItem.name}>
                {medicineItem.name} - {medicineItem.quantity} -{' '}
                {medicineItem.dosage}
                <Button onClick={() => openEditDialog(medicineItem)}>
                  <EditIcon color="action" />
                </Button>
                <Button
                  onClick={() => {
                    setPrescriptionList((prevList: any) =>
                      prevList.filter(
                        (item: any) => item.name !== medicineItem.name
                      )
                    )
                  }}
                >
                  <DeleteIcon color="error" />
                </Button>
              </li>
            ))}
          </ol>
          {editingItem && (
            <Dialog
              open={Boolean(editingItem)}
              onClose={() => setEditingItem(null)}
            >
              <DialogTitle>Edit Medicine</DialogTitle>
              <DialogContent>
                <TextField
                  label="Medicine Name"
                  value={editForm.name}
                  margin="normal"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={editForm.quantity}
                  onChange={handleFormChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Dosage"
                  name="dosage"
                  value={editForm.dosage}
                  onChange={handleFormChange}
                  margin="normal"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleUpdate}>Update</Button>
                <Button onClick={() => setEditingItem(null)}>Cancel</Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
        <Button
          disabled={false}
          variant="contained"
          onClick={() => handleSubmitPrescription()}
        >
          {localStorage.getItem('PrescriptionId')
            ? 'Update Prescription'
            : 'Submit Prescription'}
        </Button>
      </OnlyAuthenticated>

      <Grid container spacing={4}>
        {resultingMedicines.map((medicine: IMedicine) => (
          <Grid item xs={12} md={6} lg={4} key={medicine._id}>
            <MedicineCard
              medicine={medicine}
              onAddToPrescription={addToPrescription}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ViewAllMedicines
