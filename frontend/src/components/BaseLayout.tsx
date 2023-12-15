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
  alpha,
  InputBase,
} from '@mui/material'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { Logout as LogoutIcon } from '@mui/icons-material'
import { NotificationsList } from './notification'
// import { NotificationsList } from './notification'
import { useAuth } from '@/hooks/auth'
import { ChatsProvider } from '@/providers/ChatsProvider'
import { ChatsList } from './chats/ChatsList'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
// import { NotificationsList } from './notification'
import { useNavigate, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProfileMenu } from './ProfileMenu'
import SearchIcon from '@mui/icons-material/Search'
import { faCapsules } from '@fortawesome/free-solid-svg-icons'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    border: '1px solid', // Add border property here
    borderRadius: '18px',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(9)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))
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
        sx={{ width: '100%' }}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} sx={{ color: 'black' }} />
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
          bgcolor: 'white',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            border: '0px',
            bgcolor: 'white ',
            color: 'primary.main',
            zIndex: '1000',
            flexGrow: 1,
            flex: 4,
            width: '85%',
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

            <OnlyAuthenticated>
              <ProfileMenu />
              <NotificationsList />
              <ChatsList />
            </OnlyAuthenticated>

            <Box sx={{ flexGrow: 1 }} />
            <OnlyAuthenticated>
              <Search sx={{ marginRight: 20 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </OnlyAuthenticated>
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
            bgcolor: '#F0F0F0',
            position: 'relative',
          }}
        >
          <AppBar
            style={{
              width: '15%',
              left: '0',
              top: '0',
              backgroundColor: '#F0F0F0',
              overflow: 'auto',
            }}
          >
            <List
              aria-label="main mailbox folders"
              sx={{
                zIndex: '99999',
                paddingTop: 5,
                bgcolor: '#F0F0F0',
                color: 'darkgray',
                height: '100vh',
                width: '100%',
              }}
            >
              <h3
                style={{
                  color: 'rgb(25, 118, 210)',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '-20px',
                }}
              >
                <FontAwesomeIcon
                  icon={faCapsules}
                  style={{ marginRight: '15px' }}
                />
                Your Pharmacy
              </h3>
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
  )

  if (user) {
    return <ChatsProvider>{layout}</ChatsProvider>
  } else {
    return layout
  }
}
