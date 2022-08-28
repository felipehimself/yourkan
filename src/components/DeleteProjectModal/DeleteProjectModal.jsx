import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useGlobalContext } from '../../store/context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DeleteProjectModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    appState: { isOpenDeleteProject, projectItems },
    dispatch,
  } = useGlobalContext();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DELETE_PROJECT' });
  };

  const handleProceed = () => {
    dispatch({
      type: 'DELETE_PROJECT',
      payload: { isOpenDeleteProject: false, id },
    });
    const changeToProject = projectItems[0].id;
    // navigate(`/tasks/${changeToProject}`);
    navigate('/')
  };

  return (
    <>
      <Dialog
        open={isOpenDeleteProject}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle sx={{ color: '#333' }}>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            If you proceed, you cannot revert this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleProceed}>
            Proceed
          </Button>
          <Button variant='contained' color='error' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProjectModal;
