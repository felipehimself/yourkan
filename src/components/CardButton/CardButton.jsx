import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useGlobalContext } from '../../store/context/AppContext';

const ITEM_HEIGHT = 48;

export default function CardButton({ projectId, contentId, colId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { dispatch } = useGlobalContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    dispatch({ type: 'DELETE_CARD', payload: { projectId, contentId, colId } });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        position: 'absolute',
        right: 0,
      }}
    >
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        sx={{ color: '#fff' }}
      >
        <MoreVertIcon />
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
            width: '12ch',
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
           <CreateIcon fontSize='small' />
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
           <DeleteIcon fontSize='small' />
        </MenuItem>
      </Menu>
    </Box>
  );
}
