import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import { SignInSignUpRequest, SignInRequest, SignUpRequest, ResetPasswordRequest, EditProfileRequest } from "../AuthConfig";

import { Box, Button, Menu, MenuItem, Divider } from '@mui/material';
import { AccountCircle, Login, Logout, KeyboardArrowDown } from '@mui/icons-material';

const LoginMenu = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [anchorElementLoginMenu, setAnchorElementLoginMenu] = React.useState<HTMLElement | null>(null);

  const logInUser = () => {
    instance.loginRedirect(SignInSignUpRequest);
  };

  const signInUser = () => {
    instance.loginRedirect(SignInRequest);
  };

  const signUpUser = () => {
    instance.loginRedirect(SignUpRequest);
  };

  const logoutUser = () => {
    navigate("/");
    instance.logoutRedirect();
  };

  const editProfile = () => {
    setAnchorElementLoginMenu(null);
    instance.loginRedirect(EditProfileRequest);
  };

  const resetPassword = () => {
    setAnchorElementLoginMenu(null);
    instance.loginRedirect(ResetPasswordRequest);
  };

  const viewUserProfile = () => {
    setAnchorElementLoginMenu(null);
    navigate("profile");
  };

  if (isAuthenticated) {
    return (
      <Box sx={{ marginLeft: "auto" }}>
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => { setAnchorElementLoginMenu(event.currentTarget); }}
          startIcon={<AccountCircle />}
          endIcon={<KeyboardArrowDown />}
          sx={{ color: "white", marginRight: "12px;" }} >
          {account?.name}
        </Button>
        <Menu
          anchorEl={anchorElementLoginMenu}
          open={Boolean(anchorElementLoginMenu)}
          onClose={() => setAnchorElementLoginMenu(null)}
        >
          <MenuItem disableRipple sx={{ width: 1 }} onClick={editProfile}>
            <AccountCircle sx={{ mr: 1 }} /> Edit profile
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem disableRipple sx={{ width: 1 }} onClick={resetPassword}>
            <AccountCircle sx={{ mr: 1 }} /> Reset password
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

          <MenuItem disableRipple onClick={logoutUser} >
            <Logout sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Box>
    );
  }
  else {
    return (
      <Box sx={{ marginLeft: "auto", marginRight: "12px" }}>
        <Button onClick={logInUser} color="inherit" startIcon={<Login />}  >SignIn/SignUp </Button>
        <Button onClick={signInUser} color="inherit" startIcon={<Login />}  >SignIn</Button>
        <Button onClick={signUpUser} color="inherit" startIcon={<Login />}  >SignUp</Button>
      </Box>
    );
  }
}

export default LoginMenu;