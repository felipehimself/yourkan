import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { TextField, Box } from '@mui/material';
import { useGlobalContext } from '../../store/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddProjectModal() {
  const [name, setName] = useState('');

  const {
    appState: { isOpenAddProject },
    dispatch,
  } = useGlobalContext();

  const navigate = useNavigate();

  const cancelAddProject = () => {
    dispatch({ type: 'CLOSE_ADD_PROJECT' });
    setName('');
  };

  const addProject = () => {
    if (name) {
      const id = uuidv4();
      dispatch({ type: 'ADD_PROJECT', payload: { name, id } });
      navigate(`/tasks/${id}`);
      setName('');
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  return (
    <Dialog
      open={isOpenAddProject}
      onClose={cancelAddProject}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      TransitionComponent={Transition}
    >
      <Box sx={{ p: 3}}>
        <Typography sx={{color:"#333", textAlign:'center'}} variant='h6'>Create New Item</Typography>
        <TextField
          sx={{ input: { color: '#333' }, marginTop: 2 }}
          size='small'
          id='outlined-basic'
          label='Title'
          variant='standard'
          value={name}
          onChange={handleName}

        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1.2,
            marginTop: 4
          }}
        >
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            onClick={addProject}
          >
            ADD
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={cancelAddProject}
            autoFocus
          >
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
