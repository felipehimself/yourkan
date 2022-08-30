import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../../store/context/AppContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../Logo/Logo';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import {
  Link as RouterLink,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom';
import {Tooltip} from '@mui/material'
import Link from '@mui/material/Link';
import AddNewTaskBtn from '../AddNewTaskBtn/AddNewTaskBtn';
import TopbarMenu from '../TopbarMenu/TopbarMenu';
import CheckIcon from '@mui/icons-material/Check';
import { v4 as uuidv4 } from 'uuid';
import { TextField } from '@mui/material';

import './GlobalCssDrawer.css';
const drawerWidth = 240;

const DrawerNav = React.memo((props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [projectName, setProjectName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [newProjectName, setNewProjectName] = useState('');

  const ref = useRef(null);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { id } = useParams();
  const { appState, dispatch } = useGlobalContext();

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar>
        <Link
          component={RouterLink}
          to='/'
          sx={{
            textDecoration: 'none',
            color: '#fff',
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Typography variant='h6' noWrap component='div'>
            YouKan
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ pl: 4 }}>
          <ListItemButton disabled>
            <ListItemText
              primary={`All Projects (${appState.projectItems.length})`}
              sx={{ fontSize: '1px' }}
            />
          </ListItemButton>
        </ListItem>
        {appState?.projectItems.map(({ name, id }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(id)}
              selected={pathname.includes(id)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isMenuOpen ? 2 : 'auto',
                }}
              >
                <AccountTreeIcon sx={{ color: '#fff', fontSize: '18px' }} />
              </ListItemIcon>
              <Tooltip title={name.length > 15 ? name : ''} placement="right-end">
                <ListItemText
                  primary={name.length > 15 ? name.slice(0, 16) + '...' : name}
                                    
                />
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isMenuOpen ? 'initial' : 'center',
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
      <Divider />
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: '#2c2c38',
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <ChevronRightIcon />
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
                      textTransform: 'capitalize',
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
                sx={{ textTransform: 'capitalize' }}
              >
                {projectName}
              </Typography>
            )}
            {pathname !== '/' && (
              <Box>
                <AddNewTaskBtn />
                <TopbarMenu projectId={id} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: '#2c2c38',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: '#2c2c38',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
});

export default DrawerNav;
