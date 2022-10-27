import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';

import { AppBar, Divider, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Assessment } from '@mui/icons-material';

import LoginMenu from './LoginMenu';

const Banner = () => {
  let isAuthenticated = useIsAuthenticated();
  let navigate = useNavigate();

  return (
    <AppBar position="relative" sx={{ background: "linear-gradient(to right bottom, #00498D, #02386E)" }}  >
      <Toolbar variant='dense' disableGutters >
        <IconButton onClick={() => { navigate("/") }} color="inherit" sx={{mx:0}} >
          <Assessment  />
          <Typography variant="h6" sx={{ml:1}} >Azure AD B2C Auth Demo</Typography>
        </IconButton>
        <Divider orientation='vertical' flexItem sx={{mx:1}} />
        {isAuthenticated && (
          <>
             <Button onClick={()=>{navigate("/token")}} sx={{color:"white"}} >Token</Button>
             <Divider orientation='vertical' flexItem sx={{mx:1}} />
             <Button onClick={()=>{navigate("/identities")}} sx={{color:"white"}} >Identities</Button>
             <Divider orientation='vertical' flexItem sx={{mx:1}} />
          </>
        )}
        <LoginMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Banner;