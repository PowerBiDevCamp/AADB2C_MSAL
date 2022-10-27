import React from "react";
import ReactDOM from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

import App from './App';

import { msalConfig } from "./AuthConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <MsalProvider instance={msalInstance} >
        <App />
    </MsalProvider>
);