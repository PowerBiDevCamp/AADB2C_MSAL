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

const Token = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  console.log("account", account);

  if (!isAuthenticated) {
    return <PageNotAccessible />;
  }
  else {
    return (
      <Container maxWidth="xl">
            <h2>Claims in Access Token</h2>
            <TableContainer component={Paper}>
              <Table aria-label="simple table" sx={{ marginTop: "12px" }}>
                <TableHead sx={{ "& th": { color: "white", backgroundColor: "black" } }} >
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(account.idTokenClaims).map((key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">{key}</TableCell>
                      <TableCell>{(account.idTokenClaims[key] as string)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      </Container>
    )
  }
}

export default Token;