import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Typography, Modal } from '@mui/material';
import LabTabs from './Tabs';
import style from '../../helpers/PopStyle';

const theme = createTheme({
  palette: {
    primary: {
      light: '#66cccc',
      main: '#2D9B9B',
      dark: '#006c6d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6a74',
      main: '#d53449',
      dark: '#9e0022',
      contrastText: '#fff',
    },
  },
});
const PopUp = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img src="./pawsLogo.png" alt="logo" width="40px" height="40px" />
              <section className="tabs">
                <LabTabs open={setOpen} />
              </section>
            </Typography>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};
export default PopUp;
