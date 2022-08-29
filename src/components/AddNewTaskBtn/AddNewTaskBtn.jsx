import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useGlobalContext } from '../../store/context/AppContext';

const AddNewTaskBtn = () => {
  const { dispatch } = useGlobalContext();

  const handleOpenAddNewTask = () => {
    dispatch({
      type: 'OPEN_TASK_MODAL',
    });
  };

  return (
    <Button
      startIcon={<Add />}
      size='small'
      variant='contained'
      sx={{ textTransform: 'capitalize' }}
      onClick={handleOpenAddNewTask}
    >
      Add New Task
    </Button>
  );
};
export default AddNewTaskBtn;
