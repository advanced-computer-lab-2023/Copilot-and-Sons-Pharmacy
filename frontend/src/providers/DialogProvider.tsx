import { createContext, useState, ReactNode } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Stack,
} from '@mui/material'

export const DialogContext = createContext<any | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<any>([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = (dialog: any) => {
    setDialog(dialog)
    setIsDialogOpen(true)
  }

  return (
    <DialogContext.Provider
      value={{
        openDialog,
      }}
    >
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <Stack spacing={2}>
            <Box>{dialog}</Box>
            <ButtonGroup fullWidth>
              <Button
                variant="contained"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
            </ButtonGroup>
          </Stack>
        </DialogContent>
      </Dialog>
      {children}
    </DialogContext.Provider>
  )
}
