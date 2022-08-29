import { useState, useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { useGlobalContext } from '../../store/context/AppContext';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddTaskModal = () => {
  const [task, setTask] = useState({});

  const { id } = useParams();

  const { appState, dispatch } = useGlobalContext();

  const handleCloseModal = () => {
    dispatch({
      type: 'CLOSE_TASK_MODAL',
    });
    setTask({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    if (appState.taskToEdit === null) {
      if (task.title && task.desc) {
        dispatch({
          type: 'ADD_NEW_TASK',
          payload: { newTask: { ...task, contentId: uuidv4() }, id },
        });
        setTask({});
      }
    } else {
      if (task.title && task.desc) {
        dispatch({ type: 'SAVE_EDIT_TASK', payload: task });
        setTask({});
      }
    }
  };

  useEffect(() => {
    if (appState.taskToEdit !== null) {
      const { content, ...rest } = appState.taskToEdit;

      setTask(() => ({ ...content, ...rest }));
    }
  }, [appState]);


  return (
    <Dialog
      TransitionComponent={Transition}
      open={appState.isOpenTaskModal}
      onClose={handleCloseModal}
      PaperProps={{ style: { background: '#494955' } }}
    >
      <DialogTitle sx={{ color: '#fff', textAlign: 'center' }}>
        {appState.taskToEdit === null ? 'New Task' : 'Edit Task'}
      </DialogTitle>
      <DialogContent>
        <TextField
          id='standard-basic'
          variant='standard'
          inputProps={{ style: { borderBottom: '1px solid #fff' } }}
          fullWidth
          label='Title'
          sx={{ marginBottom: 2 }}
          size='small'
          InputLabelProps={{ style: { color: '#fff' } }}
          value={task.title || ''}
          name='title'
          onChange={handleChange}
        />

        <TextField
          id='standard-basic'
          variant='standard'
          inputProps={{ style: { borderBottom: '1px solid #fff' } }}
          fullWidth
          label='Description'
          size='small'
          InputLabelProps={{ style: { color: '#fff' } }}
          value={task.desc || ''}
          name='desc'
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ marginRight: 2, pb: 3 }}>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Save
        </Button>
        <Button variant='contained' color='error' onClick={handleCloseModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
