import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import {
  DarkMode,
  LightMode,
  Logout as LogoutIcon,
  ShoppingCart,
} from '@mui/icons-material'
import { NotificationsList } from './notification'

// import { NotificationsList } from './notification'
import { useAuth } from '@/hooks/auth'
import { ChatsProvider } from '@/providers/ChatsProvider'
import { ChatsList } from './chats/ChatsList'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
// import { NotificationsList } from './notification'
import { useNavigate, useLocation } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { ProfileMenu } from './ProfileMenu'

import { UserType } from 'pharmacy-common/types/user.types'
import { useCart } from '@/hooks/cartHook'

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props
  const location = useLocation()

  return (
    <li>
      <ListItemButton
        component={Link}
        to={to}
        selected={location.pathname === to}
        sx={{
          width: '100%',
          borderRadius: '20px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'primary.contrastText',
          },
        }}
      >
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

interface SidebarLink {
  to: string
  text: string
  icon?: React.ReactElement
}

export function BaseLayout() {
  const { user } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { setCartOpen } = useCart()

  const theme = createTheme({
    typography: {
      fontFamily: 'Quicksand Variable',
      fontSize: 15,
    },
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: user
          ? {
              [UserType.Admin]: '#F6BD60',
              [UserType.Doctor]: '#F28482',
              [UserType.Patient]: '#84A59D',
              [UserType.Pharmacist]: '#5893e0',
            }[user.type]
          : '#393E41',
        contrastText: '#fff',
      },
      background: {
        default: isDarkMode ? '#1e2122' : '#fafafa',
      },
    },
  })

  const [sidebarLinks, setSidebarLinks] = useState<SidebarLink[]>([])
  const navigate = useNavigate()

  // Function to handle the back button click
  const handleBackButtonClick = () => {
    navigate(-1) // This will navigate back one step in the browser history
  }

  // Function to handle the forward button click
  const handleForwardButtonClick = () => {
    navigate(1) // This will navigate forward one step in the browser history
  }

  const layout = (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />

        <Box
          sx={{
            flexDirection: 'row-reverse',
            display: 'flex',
            justifyContent: 'between',
            width: '100%',
            alignItems: 'start',
            paddingBottom: 12,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              border: '0px',
              color: isDarkMode ? 'primary.textContrast' : 'primary.main',
              zIndex: '1000',
              flexGrow: 1,
              flex: 4,
              width: '80%',
              flexWrap: 'wrap',
            }}
          >
            <Toolbar sx={{ paddingY: 3, border: '0px' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleBackButtonClick}
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleForwardButtonClick}
                sx={{ mr: 2, marginRight: 2 }}
              >
                <ArrowForwardIcon />
              </IconButton>

              <IconButton
                onClick={() => setIsDarkMode(!isDarkMode)}
                color="inherit"
              >
                {isDarkMode ? <DarkMode /> : <LightMode />}
              </IconButton>

              <OnlyAuthenticated>
                <ProfileMenu />
                <Box sx={{ flexGrow: 10 }} />
                <NotificationsList />
                <Box sx={{ flexGrow: 0.1 }} />
                <ChatsList />
              </OnlyAuthenticated>

              <OnlyAuthenticated requiredUserType={UserType.Patient}>
                <IconButton onClick={() => setCartOpen(true)} color="inherit">
                  <ShoppingCart />
                </IconButton>
              </OnlyAuthenticated>

              <Box sx={{ flexGrow: 1 }} />
              <OnlyAuthenticated></OnlyAuthenticated>
            </Toolbar>

            <Box
              component="main"
              sx={{
                display: 'flex',
                bgcolor: 'background.default',
                p: 3,
                flexGrow: 1,
              }}
            >
              <Outlet
                context={
                  { setSidebarLinks, sidebarLinks } satisfies OutletContextType
                }
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: '15%',
              alignItems: 'start',
              position: 'relative',
            }}
          >
            <AppBar
              style={{
                width: '15%',
                left: '0',
                top: '0',
              }}
            >
              <List
                aria-label="main mailbox folders"
                sx={{
                  zIndex: '99999',
                  paddingTop: 5,
                  height: '100vh',
                  width: '100%',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '-20px',
                    marginBottom: '40px',
                    fontWeight: 'bold',
                  }}
                >
                  <img
                    src="../../src/assets/logo2.png"
                    style={{ width: '50px', height: '40px' }}
                  />
                  Pharmacy
                </Typography>
                {sidebarLinks.map((link) => (
                  <ListItemLink
                    key={link.to}
                    to={link.to}
                    primary={link.text}
                    icon={link.icon}
                  />
                ))}

                <OnlyAuthenticated>
                  <ListItemLink
                    to="/auth/logout"
                    primary="Logout"
                    icon={<LogoutIcon />}
                  />
                </OnlyAuthenticated>
              </List>
            </AppBar>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )

  if (user) {
    return <ChatsProvider>{layout}</ChatsProvider>
  } else {
    return layout
  }
}
