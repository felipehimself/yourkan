import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useGlobalContext } from '../../store/context/AppContext';

import Logo from './../../components/Logo/Logo';

import './GlobalCssDrawer.css';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const [projectName, setProjectName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const theme = useTheme();

  const { pathname } = useLocation();
  const { id } = useParams();

  const { appState, dispatch } = useGlobalContext();
  

  useEffect(() => {
    const project = appState.projectItems?.find((menuItem) => menuItem.id === id);

    if (!project) return;

    setProjectName(project.name);
  }, [id, appState]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={isMenuOpen} sx={{ backgroundColor: '#2c2c38' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => setIsMenuOpen((prev) => !prev)}
            edge='start'
            sx={{
              marginRight: 5,
              ...(isMenuOpen && { display: 'none' }),
            }}
          >
            <ChevronRightIcon style={{ color: '#fff' }} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ textTransform: 'capitalize' }}
            >
              {projectName}
            </Typography>
            {pathname !== '/' && (
              <Button size='small' variant='contained' sx={{ textTransform: 'capitalize' }}>
                <AddIcon sx={{fontSize:16}} /> Add New Task
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        open={isMenuOpen}
        PaperProps={{
          sx: {
            color: '#fff',
            backgroundColor: '#2c2c38',
          },
        }}
      >
        <DrawerHeader>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ paddingLeft: 2, display: 'flex', alignItems: 'center' }}>
              <Logo />
              <Typography variant='h6' noWrap component='div'>
                YourKan
              </Typography>
            </Box>
            <IconButton onClick={() => setIsMenuOpen((prev) => !prev)}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon style={{ color: '#fff' }} />
              ) : (
                <ChevronLeftIcon style={{ color: '#fff' }} />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        {isMenuOpen && <Typography color="secondary"  variant='subtitle2' sx={{px: 2.5, pt:1.4 }}>All Items ({appState.projectItems.length}) </Typography>
}
        <List>
          {appState.projectItems.map(({ name, id }) => (
            <Link
              key={id}
              component={RouterLink}
              to={`tasks/${id}`}
              sx={{
                textDecoration: 'none',
                color: '#fff',
                textTransform: 'capitalize',
              }}
            >
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isMenuOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  selected={pathname.includes(id)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isMenuOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <AccountTreeIcon
                      style={{ color: '#fff', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} sx={{ opacity: isMenuOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}

              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isMenuOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={()=> dispatch({type:'OPEN_ADD_PROJECT'})}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isMenuOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <AddIcon
                      style={{ color: '#645fc6 ', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  {isMenuOpen && <Typography variant='subtitle2' color='primary'>Create New Item</Typography>}
                </ListItemButton>
              </ListItem>


        </List>
        <Divider />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
