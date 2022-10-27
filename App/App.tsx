import { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { EventType, InteractionType, InteractionRequiredAuthError, EventMessage, AccountInfo } from "@azure/msal-browser";
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import PageLayout from './components/PageLayout'
import { Box, CssBaseline } from '@mui/material';

import { msalConfig, b2cPolicies, AppOwnsDataApiPermissionScopes } from "./AuthConfig";

const App = () => {
  const { instance } = useMsal();

  const selectAccount = () => {
    console.log("Executing selectAccount");
    const currentAccounts = instance.getAllAccounts();

    // if the are no accounts in cache, do nothing
    if (currentAccounts.length < 1) {
      return;
    }
    // if there is 1 account, set that account as the active account
    if (currentAccounts.length === 1) {
      instance.setActiveAccount(currentAccounts[0]);
      return;
    }

    // if there are multiple accounts, ensure the account with the signup/signin policy is active
    if (currentAccounts.length > 1) {
      let currentAccountPolicy = (instance.getActiveAccount()?.idTokenClaims as any)?.tfp.toUpperCase();
      let requiredAccountPolicy = b2cPolicies.names.signUpSignIn.toUpperCase();
      if (currentAccountPolicy !== requiredAccountPolicy) {
        console.log("WRONG ACCOUNT ACTIVE! - setting active account back to " + b2cPolicies.names.signUpSignIn);
        const filteredAccounts = currentAccounts.filter(account =>
          account.homeAccountId.toUpperCase().includes(b2cPolicies.names.signUpSignIn.toUpperCase()) &&
          account.idTokenClaims.iss.toUpperCase().includes(b2cPolicies.authorityDomain.toUpperCase()) &&
          account.idTokenClaims.aud === msalConfig.auth.clientId
        );

        // determine if search found signup/signin policy account
        if (filteredAccounts.length > 0) {
          // if so, set signup/signin policy accountas active account
          console.log("Setting SignUp/Signin policy as active account", filteredAccounts[0])
          instance.setActiveAccount(filteredAccounts[0]);
        }
      }
    }
  }

  const handleMsalEventCallback = (event: EventMessage) => {
    console.log("MSAL Event callback", event.eventType);
    switch (event.eventType) {
      case EventType.INITIALIZE_END:
      case EventType.LOGIN_SUCCESS:
      case EventType.ACQUIRE_TOKEN_SUCCESS:
        selectAccount();
        break;
    }
  };

  useEffect(() => {
    const callbackId = instance.addEventCallback(handleMsalEventCallback);
    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, []);

  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    </Box>
  )
}

export default App;