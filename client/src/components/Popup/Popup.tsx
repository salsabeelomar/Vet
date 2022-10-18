import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box, Button,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LabTabs from './Tabs';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
};

const PopUp = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img src="./pawsLogo.png" alt="logo" width="40px" height="40px" />
            <LabTabs />
          </Typography>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};
export default PopUp;
