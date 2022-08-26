import { Box } from '@mui/material';

const Logo = () => {
  return (
    <Box sx={{display:"flex", gap:'2px', marginRight:'20px'}}>
      <Box sx={{height:'18px', width: '4px', borderRadius: '5px', backgroundColor:'#645fc6'}} />
      <Box sx={{height:'18px', width: '4px', borderRadius: '5px', backgroundColor:'#837fd1'}} />

      <Box sx={{height:'18px', width: '4px', borderRadius: '5px', backgroundColor:'#a29fdd'}} />

    </Box>
  );
};
export default Logo;
