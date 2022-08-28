import { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useGlobalContext } from '../../store/context/AppContext';
const ITEM_HEIGHT = 48;

const TopbarMenu = ({ projectId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { dispatch } = useGlobalContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch({ type: 'OPEN_DELETE_PROJECT' });
    setAnchorEl(null);
  };

  const handleEdit = () => {
    dispatch({ type: 'EDIT_PROJECT_NAME', payload: { id: projectId } });
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        sx={{ color: '#fff' }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            background: '#21212d',
            // width: '12ch',
          },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            fontSize: 14,
            display: 'flex',
          }}
        >
          <CreateIcon fontSize='2px' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <DeleteIcon fontSize='2px' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
export default TopbarMenu;
