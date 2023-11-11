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

import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { Logout } from '@mui/icons-material'

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to?: string
  action?: { (): void }
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, action } = props

  return (
    <li>
      {action ? (
        <ListItemButton onClick={action}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItemButton>
      ) : to ? (
        <ListItemButton component={Link} to={to} onClick={action}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItemButton>
      ) : null}
    </li>
  )
}

export type OutletContextType = {
  setSidebarLinks: React.Dispatch<React.SetStateAction<SidebarLink[]>>
  sidebarLinks: SidebarLink[]
}

const drawerWidth = 240

interface SidebarLink {
  to?: string
  text: string
  icon?: React.ReactElement
  action?: { (): void }
}

export function BaseLayout() {
  const [sidebarLinks, setSidebarLinks] = useState<SidebarLink[]>([])

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
          {sidebarLinks.map((link, i) => (
            <ListItemLink
              action={link.action}
              key={i}
              to={link.to}
              primary={link.text}
              icon={link.icon}
            />
          ))}
          <OnlyAuthenticated>
            <ListItemLink
              to="/auth/logout"
              primary="Logout"
              icon={<Logout />}
            />
          </OnlyAuthenticated>

          {/* 
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
          /> */}
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
