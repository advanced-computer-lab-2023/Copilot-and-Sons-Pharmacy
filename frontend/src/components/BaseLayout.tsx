import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PersonIcon from '@mui/icons-material/Person'

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props

  return (
    <li>
      <ListItemButton component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  )
}

export type OutletContextType = {
  setSidebarLinks: React.Dispatch<React.SetStateAction<SidebarLink[]>>
  sidebarLinks: SidebarLink[]
}

const drawerWidth = 240

interface SidebarLink {
  to: string
  text: string
  icon?: React.ReactElement
}

export function BaseLayout() {
  const [sidebarLinks, setSidebarLinks] = React.useState<SidebarLink[]>([])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Pharmacy
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List aria-label="main mailbox folders">
          {sidebarLinks.map((link) => (
            <ListItemLink
              key={link.to}
              to={link.to}
              primary={link.text}
              icon={link.icon}
            />
          ))}

          <ListItemLink
            to="/pharmacist-dashboard"
            primary="pharmacist"
            icon={<PersonIcon />}
          />
          <ListItemLink
            to="/patient-dashboard"
            primary="patient"
            icon={<PersonIcon />}
          />

          <ListItemLink
            to="/admin-dashboard"
            primary="admin"
            icon={<AdminPanelSettingsIcon />}
          />
          <ListItemLink
            to="/auth/register"
            primary="Authorization"
            icon={<AppRegistrationIcon />}
          />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet
          context={
            { setSidebarLinks, sidebarLinks } satisfies OutletContextType
          }
        />
      </Box>
    </Box>
  )
}
