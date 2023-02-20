import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ButtonTags(props) {
  return (
    // <Stack direction="row" spacing={2}>
    <Box sx={{padding:1, }}>
      <Button sx={{borderRadius: '30px'}}variant="outlined" endIcon={<CancelIcon />}>
        {props.tag}
      </Button>
      {/* <Button variant="contained" endIcon={<SendIcon />}>
        Send
    </Button> */}
    </Box>
    // </Stack>
  );
}