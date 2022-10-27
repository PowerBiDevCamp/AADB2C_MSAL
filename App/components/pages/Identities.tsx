import React from 'react';
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import PageNotAccessible from '../PageNotAccessible';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { msalInstance } from '../..';


const Identities = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  //  const account = useAccount(accounts[0] || {});

  const displayActiveAccount = () => {
    let account = instance.getActiveAccount();
    console.log("Active account", account.idTokenClaims);
  };

  if (!isAuthenticated) {
    return <PageNotAccessible />
  }
  else {
    return (
      <Container>
        <h2>Identities</h2>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" sx={{ marginTop: "12px" }}>
            <TableHead sx={{ "& th": { color: "white", backgroundColor: "black" } }} >
              <TableRow>
              <TableCell>Local Account ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Policy Name</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={((account.idTokenClaims as any)?.tfp) ?? "key1"} >
                  <TableCell>{account.localAccountId}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell component="th" scope="row">{(account.idTokenClaims as any)?.tfp}</TableCell>
                  <TableCell>{String((msalInstance.getActiveAccount()?.idTokenClaims as any)?.tfp == (account.idTokenClaims as any)?.tfp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>)
  }
};

export default Identities;