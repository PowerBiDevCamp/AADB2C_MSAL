import React from 'react';
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import PageNotAccessible from './../PageNotAccessible';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container } from '@mui/material';

const Home = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  if (isAuthenticated) {
    return (
      <Container maxWidth="xl">
        <h2>User Properties from Claims in B2C Token</h2>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" sx={{ marginTop: "12px" }}>
            <TableHead sx={{ "& th": { color: "white", backgroundColor: "black" } }} >
              <TableRow>
                <TableCell>Claim</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow key={"idp"}>
                <TableCell component="th" scope="row">Identity Provider</TableCell>
                <TableCell>{ (account?.idTokenClaims as any)?.idp ?? "Local B2C Consumer Account" }</TableCell>
              </TableRow>
              <TableRow key={"name"}>
                <TableCell component="th" scope="row">Display Name</TableCell>
                <TableCell>{account?.name}</TableCell>
              </TableRow>
              <TableRow key={"email"}>
                <TableCell component="th" scope="row">email</TableCell>
                <TableCell>{(account.idTokenClaims as any).email}</TableCell>
              </TableRow>
              <TableRow key={"emails"}>
                <TableCell component="th" scope="row">emails (collection)</TableCell>
                <TableCell>{account.idTokenClaims.emails}</TableCell>
              </TableRow>
              <TableRow key={"localAccountId"}>
                <TableCell component="th" scope="row">localAccountId</TableCell>
                <TableCell>{account?.localAccountId}</TableCell>
              </TableRow>
              <TableRow key={"environment"}>
                <TableCell component="th" scope="row">environment</TableCell>
                <TableCell>{account?.environment}</TableCell>
              </TableRow>
              <TableRow key={"policy"}>
                <TableCell component="th" scope="row">B2C policy (ftp)</TableCell>
                <TableCell>{(account.idTokenClaims as any)?.tfp}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  }
  else {
    return (
      <Box>
        <h2>User is not authenticated</h2>
        <div>Click one of the links in the upper right to get started.</div>
      </Box>
    )
  }
}

export default Home;