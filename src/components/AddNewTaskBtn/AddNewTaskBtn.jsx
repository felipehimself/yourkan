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
    <>
      <Button
        startIcon={<Add />}
        size='small'
        variant='contained'
        sx={{
          textTransform: 'capitalize',
          display: { sm: 'inline-flex', xs: 'none' },
        }}
        onClick={handleOpenAddNewTask}
      >
        ADD NEW TASK
      </Button>
      <Button
        onClick={handleOpenAddNewTask}
        size='large'
        startIcon={<Add sx={{ color: '#fff' }} />}
        sx={{ display: { sm: 'none', xs: 'inline-flex' } }}
        variant='text'
      />
    </>
  );
};
export default AddNewTaskBtn;
