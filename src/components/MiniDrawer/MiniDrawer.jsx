import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
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
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import AddNewTaskBtn from '../AddNewTaskBtn/AddNewTaskBtn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useGlobalContext } from '../../store/context/AppContext';
import TopbarMenu from '../TopbarMenu/TopbarMenu';
import Logo from './../../components/Logo/Logo';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {Tooltip} from '@mui/material';
import './GlobalCssDrawer.css';

const drawerWidth = 230;

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
  const [newProjectName, setNewProjectName] = useState('');

  const ref = useRef(null);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { id } = useParams();
  const { appState, dispatch } = useGlobalContext();

  const theme = useTheme();

  const addProject = (e) => {
    if (!newProjectName) return;

    if (e.type === 'click') {
      const id = uuidv4();
      dispatch({ type: 'ADD_PROJECT', payload: { name: newProjectName, id } });
      navigate(`/tasks/${id}`);
      setNewProjectName('');
    } else if (e.type === 'keydown' && e.key === 'Enter') {
      const id = uuidv4();
      dispatch({ type: 'ADD_PROJECT', payload: { name: newProjectName, id } });
      navigate(`/tasks/${id}`);
      setNewProjectName('');
    }
  };

  const handleChangeProjectName = (e) => {
    if (!projectName) return;

    if (e.type === 'click') {
      dispatch({
        type: 'CHANGE_PROJECT_NAME',
        payload: { id, name: projectName },
      });
    } else if (e.type === 'keydown' && e.key === 'Enter') {
      dispatch({
        type: 'CHANGE_PROJECT_NAME',
        payload: { id, name: projectName },
      });
    }
  };

  const handleNavigation = (path) => {
    dispatch({
      type: 'EDIT_PROJECT_NAME',
      payload: { id: '' },
    });

    navigate(`/tasks/${path}`);
  };

  useEffect(() => {
    const project = appState.projectItems?.find(
      (menuItem) => menuItem.id === id
    );

    if (!project) {
      setProjectName('Home');
      return;
    }

    setProjectName(project.name);
  }, [id, appState]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (newProjectName && ref.current && !ref.current.contains(e.target)) {
        setNewProjectName('');
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [newProjectName]);

  return (
    <Box sx={{ display: 'flex' }} ref={ref}>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={isMenuOpen}
        sx={{ backgroundColor: '#2c2c38' }}
      >
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
            <ChevronRightIcon sx={{ color: '#fff' }} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {appState.projectToEditId === id ? (
              <Box>
                <TextField
                  id='standard-basic'
                  label=''
                  variant='standard'
                  inputProps={{
                    style: {
                      borderBottom: '1px solid #fff',
                      color: '#fff',
                      
                    },
                  }}
                  size='small'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onKeyDown={handleChangeProjectName}
                />
                <IconButton onClick={handleChangeProjectName}>
                  <CheckIcon color='success' />
                </IconButton>
              </Box>
            ) : (
              <Typography
                variant='h6'
                noWrap
                component='h2'
                
              >
                {projectName}
              </Typography>
            )}

            <Box>
              {pathname !== '/' && (
                <>
                  <AddNewTaskBtn /> <TopbarMenu projectId={id} />
                </>
              )}
            </Box>
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
            <Link
              component={RouterLink}
              to='/'
              sx={{
                textDecoration: 'none',
                color: '#fff',
                textTransform: 'capitalize',
                paddingLeft: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Logo />
              <Typography variant='h6' noWrap component='div'>
                YouKan
              </Typography>
            </Link>
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
        {isMenuOpen && (
          <Typography
            color='secondary'
            variant='subtitle2'
            sx={{ px: 2.5, pt: 1.4 }}
          >
            All Projects ({appState.projectItems.length})
          </Typography>
        )}
        <List>
          {appState.projectItems.map(({ name, id }) => (
            <Tooltip  title={isMenuOpen? '' : name} placement="right">
              <ListItem
                disablePadding
                sx={{ display: 'block',  }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isMenuOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  selected={pathname.includes(id)}
                  onClick={() => handleNavigation(id)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isMenuOpen ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <AccountTreeIcon sx={{ color: '#fff', fontSize: '18px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{ opacity: isMenuOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isMenuOpen ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => setIsMenuOpen(true)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isMenuOpen ? 1 : 'auto',
                  justifyContent: 'center',
                }}
                onClick={addProject}
              >
                <AddIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              {isMenuOpen && (
                <TextField
                  id='standard-basic'
                  variant='standard'
                  inputProps={{ style: { borderBottom: '1px solid #fff' } }}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  value={newProjectName}
                  onKeyDown={addProject}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
        {/* <Divider /> */}
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
