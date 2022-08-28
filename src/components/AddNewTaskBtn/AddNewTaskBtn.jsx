import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const AddNewTaskBtn = () => {
  return (
    <Button
      startIcon={<Add />}
      size='small'
      variant='contained'
      sx={{ textTransform: 'capitalize' }}
    >
      Add New Task
    </Button>
  );
};
export default AddNewTaskBtn;
