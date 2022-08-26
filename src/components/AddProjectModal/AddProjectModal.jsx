import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {TextField, Box} from '@mui/material'
import { useGlobalContext } from '../../store/context/AppContext';
import {useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


export default function AddProjectModal() {
  const [name, setName] = useState('');

  const { appState: { isOpenAddProject }, dispatch } = useGlobalContext();

  const navigate = useNavigate()

  const cancelAddProject = () => {
    dispatch({type:'CLOSE_ADD_PROJECT'})
    setName('')
  }

  const addProject = () => {

    if(name) {
      const id = uuidv4()
      dispatch({type: 'ADD_PROJECT', payload: { name, id }});
      navigate(`/tasks/${id}`)
      setName('')
    }

  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  return (
    <Dialog
      open={isOpenAddProject}
      onClose={cancelAddProject}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      
    >
      <Box sx={{p: 3,}}>
        <TextField sx={{ input: { color: '#000' } }}  size='small' id="outlined-basic" label="Title" variant="outlined" value={name} onChange={handleName} />
        <Box sx={{display:'flex', justifyContent:'space-between', gap: 1.2, marginTop: 2.2 }}>
          <Button sx={{width:'100%', }} variant='contained' onClick={addProject}>ADD</Button>
          <Button  variant='contained' color='error' onClick={cancelAddProject} autoFocus>
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
